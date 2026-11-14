import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Imported after dotenv so auth sees the env vars
const { createAuth } = await import('./auth.js');
const { localStore } = await import('./data/storage.js');
const { Product } = await import('./models/Product.js');
const { Inquiry } = await import('./models/Inquiry.js');
const { Category } = await import('./models/Category.js');
const { Setting } = await import('./models/Setting.js');
const { AdminUser } = await import('./models/AdminUser.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ======================================================================
// Cloudinary
// ======================================================================
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryReady = Boolean(CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (cloudinaryReady) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} else {
  console.warn('⚠️  Cloudinary env vars missing (CLOUDINARY_CLOUD_NAME / _API_KEY / _API_SECRET). Image upload is disabled.');
}

const CLOUDINARY_URL_RE = /https:\/\/res\.cloudinary\.com\/[^"'\s)\\]+/g;

const isOwnCloudinaryUrl = (url) =>
  typeof url === 'string' && CLOUD_NAME && url.startsWith(`https://res.cloudinary.com/${CLOUD_NAME}/`);

function getCloudinaryPublicId(url) {
  if (!isOwnCloudinaryUrl(url)) return null;
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  const segments = parts[1].split('/');
  // drop transformation segments (contain ',' or '_' params) and version
  while (segments.length > 1 && (/^v\d+$/.test(segments[0]) || segments[0].includes(','))) segments.shift();
  const joined = segments.join('/');
  const dot = joined.lastIndexOf('.');
  return dot !== -1 ? joined.substring(0, dot) : joined;
}

const collectImageUrls = (value) => new Set(JSON.stringify(value ?? null).match(CLOUDINARY_URL_RE) || []);

// ======================================================================
// Data layer — MongoDB Atlas when connected, local JSON file otherwise
// ======================================================================
let isMongoConnected = false;
const plain = (doc) => (doc && typeof doc.toJSON === 'function' ? doc.toJSON() : doc);
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const stripMeta = ({ _id, __v, createdAt, updatedAt, ...rest }) => rest;

const store = {
  async getSettings() {
    if (isMongoConnected) {
      const s = await Setting.findOne();
      if (s) return plain(s);
    }
    return localStore.getSettings();
  },
  async saveSettings(next) {
    const clean = stripMeta(next || {});
    localStore.data.settings = clean;
    localStore.save();
    if (isMongoConnected) {
      const existing = await Setting.findOne();
      if (existing) {
        await Setting.replaceOne({ _id: existing._id }, clean);
      } else {
        await Setting.create(clean);
      }
    }
    return this.getSettings();
  },

  async listCategories() {
    if (isMongoConnected) return (await Category.find().sort({ order: 1, createdAt: 1 })).map(plain);
    return localStore.getCategories();
  },
  async createCategory(body) {
    const cat = { ...stripMeta(body), id: newId('cat') };
    localStore.addCategory(cat);
    if (isMongoConnected) await Category.create(cat);
    return cat;
  },
  async updateCategory(id, body) {
    const updates = stripMeta(body);
    delete updates.id;
    const local = localStore.updateCategory(id, updates);
    if (isMongoConnected) {
      const doc = await Category.findOneAndUpdate({ $or: [{ id }, { slug: id }] }, updates, { new: true });
      return plain(doc);
    }
    return local;
  },
  async deleteCategory(id) {
    const before = (await this.listCategories()).find((c) => c.id === id || c.slug === id);
    localStore.deleteCategory(id);
    if (isMongoConnected) await Category.deleteOne({ $or: [{ id }, { slug: id }] });
    return before || null;
  },

  async listProducts() {
    if (isMongoConnected) return (await Product.find().sort({ order: 1, createdAt: -1 })).map(plain);
    return localStore.getProducts();
  },
  async getProduct(id) {
    if (isMongoConnected) return plain(await Product.findOne({ id }));
    return localStore.getProductById(id);
  },
  async createProduct(body) {
    const prod = { rating: 5, reviewsCount: 0, inStock: true, featured: false, ...stripMeta(body), id: newId('prod') };
    localStore.addProduct(prod);
    if (isMongoConnected) await Product.create(prod);
    return prod;
  },
  async updateProduct(id, body) {
    const updates = stripMeta(body);
    delete updates.id;
    const local = localStore.updateProduct(id, updates);
    if (isMongoConnected) return plain(await Product.findOneAndUpdate({ id }, updates, { new: true }));
    return local;
  },
  async deleteProduct(id) {
    const before = await this.getProduct(id);
    localStore.deleteProduct(id);
    if (isMongoConnected) await Product.deleteOne({ id });
    return before || null;
  },

  async listInquiries() {
    if (isMongoConnected) return (await Inquiry.find().sort({ createdAt: -1 })).map(plain);
    return localStore.getInquiries();
  },
  async createInquiry(body) {
    const inq = localStore.addInquiry({ ...body, id: newId('inq') });
    if (isMongoConnected) await Inquiry.create(inq);
    return inq;
  },
  async updateInquiry(id, status) {
    const local = localStore.updateInquiryStatus(id, status);
    if (isMongoConnected) return plain(await Inquiry.findOneAndUpdate({ id }, { status }, { new: true }));
    return local;
  },
  async deleteInquiry(id) {
    const ok = localStore.deleteInquiry(id);
    if (isMongoConnected) {
      const r = await Inquiry.deleteOne({ id });
      return r.deletedCount > 0 || ok;
    }
    return ok;
  },
};

// Admin users — MongoDB when connected, otherwise data/admins.json
const adminUsers = {
  async getAdmin(username) {
    if (!username) return null;
    if (isMongoConnected) {
      const doc = await AdminUser.findOne({ username }).lean();
      if (!doc) return null;
      const { _id, __v, createdAt, updatedAt, ...user } = doc;
      return user;
    }
    return localStore.getAdmins().find((u) => u.username === username) || null;
  },
  async countAdmins() {
    if (isMongoConnected) return AdminUser.countDocuments();
    return localStore.getAdmins().length;
  },
  async saveAdmin(user) {
    if (isMongoConnected) {
      await AdminUser.updateOne({ username: user.username }, { $set: user }, { upsert: true });
    } else {
      localStore.saveAdmin(user);
    }
  },
};
const auth = createAuth(adminUsers);

// Delete Cloudinary images that are no longer referenced anywhere in the site data
async function cleanupOrphanImages(candidateUrls) {
  if (!cloudinaryReady || !candidateUrls || candidateUrls.size === 0) return;
  try {
    const [settings, categories, products] = await Promise.all([
      store.getSettings(),
      store.listCategories(),
      store.listProducts(),
    ]);
    const inUse = collectImageUrls([settings, categories, products]);
    for (const url of candidateUrls) {
      if (inUse.has(url)) continue;
      const publicId = getCloudinaryPublicId(url);
      if (!publicId) continue;
      cloudinary.uploader
        .destroy(publicId)
        .then((r) => console.log(`🧹 Cloudinary cleanup ${publicId}: ${r.result}`))
        .catch((e) => console.warn('Cloudinary cleanup notice:', e.message));
    }
  } catch (e) {
    console.warn('Image cleanup skipped:', e.message);
  }
}

// ======================================================================
// MongoDB connection + first-run seeding / migrations
// ======================================================================
async function initMongoSync() {
  try {
    if (!(await Setting.findOne())) {
      await Setting.create(stripMeta(localStore.getSettings()));
      console.log('🌱 Seeded Settings to MongoDB Atlas');
    }
    if ((await Category.countDocuments()) === 0) {
      await Category.insertMany(localStore.getCategories());
      console.log('🌱 Seeded Categories to MongoDB Atlas');
    }
    if ((await Product.countDocuments()) === 0) {
      await Product.insertMany(localStore.getProducts());
      console.log('🌱 Seeded Products to MongoDB Atlas');
    }

    // Older documents were stored without our string `id` — backfill it
    for (const [Model, prefix] of [[Product, 'prod'], [Inquiry, 'inq'], [Category, 'cat']]) {
      const missing = await Model.find({ $or: [{ id: { $exists: false } }, { id: null }, { id: '' }] });
      for (const doc of missing) {
        await Model.updateOne({ _id: doc._id }, { $set: { id: `${prefix}-${doc._id.toString()}` } });
      }
      if (missing.length) console.log(`🔧 Backfilled id on ${missing.length} ${Model.modelName} document(s)`);
    }
  } catch (err) {
    console.warn('MongoDB Atlas sync notice:', err.message);
  }
}

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas');
      initMongoSync().then(() => auth.ensureDefaultAdmin()).catch((e) => console.warn('Admin seed notice:', e.message));
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB connection failed:', err.message);
      console.warn('⚡ Falling back to local JSON storage (changes are NOT durable on Render).');
    });
  mongoose.connection.on('disconnected', () => { isMongoConnected = false; });
  mongoose.connection.on('reconnected', () => { isMongoConnected = true; });
} else {
  console.warn('⚠️  MONGODB_URI not set — using local JSON storage.');
}

// ======================================================================
// Middleware
// ======================================================================
app.set('trust proxy', 1); // correct client IP behind Render/Vercel proxies (login rate limiting)
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const wrap = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  });

// ======================================================================
// Public routes
// ======================================================================
const healthPayload = () => ({
  status: 'online',
  appName: 'Modshine Interior API',
  database: isMongoConnected ? 'MongoDB Atlas (Connected)' : 'Local JSON Engine (Active)',
  cloudinary: cloudinaryReady ? 'configured' : 'missing env',
  adminLogin: 'database',
  timestamp: new Date().toISOString(),
});

app.get('/', (req, res) => res.json(healthPayload()));
app.get('/api/health', (req, res) => res.json(healthPayload()));

app.get('/api/settings', wrap(async (req, res) => res.json(await store.getSettings())));
app.get('/api/categories', wrap(async (req, res) => res.json(await store.listCategories())));

app.get('/api/products', wrap(async (req, res) => {
  const { category, featured, search } = req.query;
  let items = await store.listProducts();
  if (category && category !== 'all') items = items.filter((p) => p.category === category);
  if (featured === 'true') items = items.filter((p) => p.featured);
  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter((p) => [p.title, p.description, p.brand, p.categoryName].some((v) => v && v.toLowerCase().includes(q)));
  }
  res.json(items);
}));

app.get('/api/products/:id', wrap(async (req, res) => {
  const item = await store.getProduct(req.params.id);
  if (!item) return res.status(404).json({ error: 'Product not found' });
  res.json(item);
}));

// Lead capture from the public website
app.post('/api/inquiries', wrap(async (req, res) => {
  const { name, phone, email, city, service, budget, propertyType, message } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and Phone number are required' });
  const clip = (v, n = 500) => String(v ?? '').slice(0, n);
  const inquiry = await store.createInquiry({
    name: clip(name, 120),
    phone: clip(phone, 40),
    email: clip(email, 160),
    city: clip(city || 'Kovilpatti', 120),
    service: clip(service || 'Modular Interior Consultation', 160),
    budget: clip(budget || 'Standard Package', 160),
    propertyType: clip(propertyType || 'Residential Apartment / House', 160),
    message: clip(message, 3000),
  });
  res.status(201).json({
    success: true,
    message: 'Thank you! Your inquiry has been received. Our Modshine interior designer will call you shortly.',
    inquiry: { id: inquiry.id, name: inquiry.name },
  });
}));

// ======================================================================
// Admin auth
// ======================================================================
app.post('/api/auth/login', auth.loginHandler);
app.get('/api/auth/me', auth.requireAdmin, (req, res) => res.json({ username: req.admin.sub, expiresAt: req.admin.exp }));

// ======================================================================
// Admin-only routes
// ======================================================================
const admin = express.Router();
admin.use(auth.requireAdmin);

admin.post('/account/password', auth.changePasswordHandler);

admin.get('/overview', wrap(async (req, res) => {
  const [products, categories, inquiries] = await Promise.all([
    store.listProducts(),
    store.listCategories(),
    store.listInquiries(),
  ]);
  res.json({
    totalProducts: products.length,
    totalCategories: categories.length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === 'New').length,
    databaseMode: isMongoConnected ? 'MongoDB Atlas (Live)' : 'Local JSON Store',
    cloudinary: cloudinaryReady,
  });
}));

admin.put('/settings', wrap(async (req, res) => {
  const before = await store.getSettings();
  const saved = await store.saveSettings(req.body);
  const removed = new Set([...collectImageUrls(before)].filter((u) => !collectImageUrls(saved).has(u)));
  cleanupOrphanImages(removed);
  res.json({ success: true, settings: saved });
}));

admin.post('/categories', wrap(async (req, res) => {
  if (!req.body?.name || !req.body?.slug) return res.status(400).json({ error: 'Name and slug are required' });
  res.status(201).json(await store.createCategory(req.body));
}));
admin.put('/categories/:id', wrap(async (req, res) => {
  const before = (await store.listCategories()).find((c) => c.id === req.params.id || c.slug === req.params.id);
  const updated = await store.updateCategory(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Category not found' });
  if (before?.image && before.image !== updated.image) cleanupOrphanImages(new Set([before.image]));
  res.json(updated);
}));
admin.delete('/categories/:id', wrap(async (req, res) => {
  const removed = await store.deleteCategory(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Category not found' });
  cleanupOrphanImages(collectImageUrls(removed));
  res.json({ success: true });
}));

admin.post('/products', wrap(async (req, res) => {
  if (!req.body?.title || !req.body?.category || !req.body?.image) {
    return res.status(400).json({ error: 'Title, category and image are required' });
  }
  res.status(201).json(await store.createProduct(req.body));
}));
admin.put('/products/:id', wrap(async (req, res) => {
  const before = await store.getProduct(req.params.id);
  const updated = await store.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Product not found' });
  if (before?.image && before.image !== updated.image) cleanupOrphanImages(new Set([before.image]));
  res.json(updated);
}));
admin.delete('/products/:id', wrap(async (req, res) => {
  const removed = await store.deleteProduct(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Product not found' });
  cleanupOrphanImages(collectImageUrls(removed));
  res.json({ success: true });
}));

admin.get('/inquiries', wrap(async (req, res) => res.json(await store.listInquiries())));
admin.put('/inquiries/:id', wrap(async (req, res) => {
  const allowed = ['New', 'Contacted', 'In-Progress', 'Completed'];
  if (!allowed.includes(req.body?.status)) return res.status(400).json({ error: 'Invalid status' });
  const updated = await store.updateInquiry(req.params.id, req.body.status);
  if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
  res.json({ success: true, inquiry: updated });
}));
admin.delete('/inquiries/:id', wrap(async (req, res) => {
  const ok = await store.deleteInquiry(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Inquiry not found' });
  res.json({ success: true });
}));

// Upload an image (data URI or remote URL) to Cloudinary
admin.post('/upload', wrap(async (req, res) => {
  if (!cloudinaryReady) return res.status(503).json({ error: 'Cloudinary is not configured on the server' });
  const { image, folder } = req.body || {};
  if (!image || typeof image !== 'string') return res.status(400).json({ error: 'Image data is required' });
  const isDataUri = /^data:image\/(png|jpe?g|webp|gif|avif|svg\+xml);base64,/i.test(image);
  const isRemote = /^https?:\/\//i.test(image);
  if (!isDataUri && !isRemote) return res.status(400).json({ error: 'Send an image file or an http(s) image URL' });
  if (isOwnCloudinaryUrl(image)) return res.json({ success: true, url: image, public_id: getCloudinaryPublicId(image) });

  const safeFolder = `modshine/${String(folder || 'content').replace(/[^a-z0-9/_-]/gi, '').replace(/^modshine\/?/, '') || 'content'}`;
  const result = await cloudinary.uploader.upload(image, {
    folder: safeFolder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  res.json({ success: true, url: result.secure_url, public_id: result.public_id, width: result.width, height: result.height });
}));

app.use('/api/admin', admin);

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Modshine Interior Server running at http://127.0.0.1:${PORT}`);
  auth.ensureDefaultAdmin().catch((e) => console.warn('Admin seed notice:', e.message));
});
