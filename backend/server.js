import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { localStore } from './data/storage.js';
import { Product } from './models/Product.js';
import { Inquiry } from './models/Inquiry.js';
import { Category } from './models/Category.js';
import { Setting } from './models/Setting.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://modshineinterior_db_user:qeiCQYqw1dVdNwGi@cluster0.h30qdq9.mongodb.net/modshine?retryWrites=true&w=majority&appName=Cluster0';

let isMongoConnected = false;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files (for images/assets)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Auto-seed Atlas collections if empty
async function initMongoSync() {
  try {
    const existingSetting = await Setting.findOne();
    if (!existingSetting) {
      await Setting.create(localStore.getSettings());
      console.log('🌱 Seeded Settings to MongoDB Atlas');
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      const cats = localStore.getCategories();
      if (cats.length > 0) {
        await Category.insertMany(cats);
        console.log(`🌱 Seeded ${cats.length} Categories to MongoDB Atlas`);
      }
    }

    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      const prods = localStore.getProducts();
      if (prods.length > 0) {
        await Product.insertMany(prods);
        console.log(`🌱 Seeded ${prods.length} Products to MongoDB Atlas`);
      }
    }

    const inqCount = await Inquiry.countDocuments();
    if (inqCount === 0) {
      const inqs = localStore.getInquiries();
      if (inqs.length > 0) {
        await Inquiry.insertMany(inqs);
        console.log(`🌱 Seeded ${inqs.length} Inquiries to MongoDB Atlas`);
      }
    }
  } catch (err) {
    console.warn('MongoDB Atlas auto-sync notice:', err.message);
  }
}

// MongoDB Connection with Graceful Fallback
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully!');
    initMongoSync();
  })
  .catch((err) => {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB connection notice:', err.message);
    console.log('⚡ Active mode: Local JSON Engine (Fast, zero-config, persistent storage)');
  });

// ================= API ROUTES =================

// Root endpoint for Render health checks and browser verification
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Modshine Interior API Server',
    version: '1.0.0',
    healthCheck: '/api/health',
    database: isMongoConnected ? 'MongoDB Atlas (Connected)' : 'Local JSON Engine (Active)'
  });
});

// Health & System status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Modshine Interior API',
    database: isMongoConnected ? 'MongoDB Atlas (Connected)' : 'Local JSON Engine (Active)',
    timestamp: new Date().toISOString()
  });
});

// Overview stats for Admin dashboard
app.get('/api/overview', async (req, res) => {
  try {
    let products = localStore.getProducts();
    let categories = localStore.getCategories();
    let inquiries = localStore.getInquiries();
    let settings = localStore.getSettings();

    if (isMongoConnected) {
      try {
        const [mProds, mCats, mInqs, mSet] = await Promise.all([
          Product.find(),
          Category.find(),
          Inquiry.find(),
          Setting.findOne()
        ]);
        if (mProds && mProds.length > 0) products = mProds;
        if (mCats && mCats.length > 0) categories = mCats;
        if (mInqs && mInqs.length > 0) inquiries = mInqs;
        if (mSet) settings = mSet;
      } catch (e) {}
    }

    const newInquiries = inquiries.filter(i => i.status === 'New').length;
    const inProgressInquiries = inquiries.filter(i => i.status === 'In-Progress').length;
    const completedInquiries = inquiries.filter(i => i.status === 'Completed').length;

    res.json({
      totalProducts: products.length,
      totalCategories: categories.length,
      totalInquiries: inquiries.length,
      newInquiries,
      inProgressInquiries,
      completedInquiries,
      settings,
      databaseMode: isMongoConnected ? 'MongoDB Atlas (Live)' : 'Local JSON Store'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Company Settings
app.get('/api/settings', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mSet = await Setting.findOne();
      if (mSet) return res.json(mSet);
    }
    res.json(localStore.getSettings());
  } catch (err) {
    res.json(localStore.getSettings());
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const updated = localStore.updateSettings(req.body);
    if (isMongoConnected) {
      try {
        await Setting.findOneAndUpdate({}, req.body, { upsert: true, new: true });
      } catch (e) {
        console.warn('Mongo update settings notice:', e.message);
      }
    }
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Categories
app.get('/api/categories', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mCats = await Category.find();
      if (mCats && mCats.length > 0) return res.json(mCats);
    }
    res.json(localStore.getCategories());
  } catch (err) {
    res.json(localStore.getCategories());
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const cat = localStore.addCategory(req.body);
    if (isMongoConnected) {
      try {
        await Category.create(cat);
      } catch (e) {
        console.warn('Mongo create category notice:', e.message);
      }
    }
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const updated = localStore.updateCategory(req.params.id, req.body);
    if (isMongoConnected) {
      try {
        await Category.findOneAndUpdate(
          { $or: [{ id: req.params.id }, { slug: req.params.id }] },
          req.body
        );
      } catch (e) {
        console.warn('Mongo update category notice:', e.message);
      }
    }
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const success = localStore.deleteCategory(req.params.id);
    if (isMongoConnected) {
      try {
        await Category.deleteOne({ $or: [{ id: req.params.id }, { slug: req.params.id }] });
      } catch (e) {
        console.warn('Mongo delete category notice:', e.message);
      }
    }
    if (!success) return res.status(404).json({ error: 'Category not found' });
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Products / Furniture Items
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    if (isMongoConnected) {
      const query = {};
      if (category && category !== 'all') query.category = category;
      if (featured === 'true' || featured === true) query.featured = true;
      if (search) query.title = { $regex: search, $options: 'i' };
      const mProds = await Product.find(query);
      if (mProds && mProds.length > 0) return res.json(mProds);
    }
    const items = localStore.getProducts({ category, featured, search });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mProd = await Product.findOne({ id: req.params.id });
      if (mProd) return res.json(mProd);
    }
    const item = localStore.getProductById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const item = localStore.addProduct(req.body);
    if (isMongoConnected) {
      try {
        await Product.create(item);
      } catch (e) {
        console.warn('Mongo create error:', e.message);
      }
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = localStore.updateProduct(req.params.id, req.body);
    if (isMongoConnected) {
      try {
        await Product.findOneAndUpdate({ id: req.params.id }, req.body);
      } catch (e) {
        console.warn('Mongo update product notice:', e.message);
      }
    }
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const success = localStore.deleteProduct(req.params.id);
    if (isMongoConnected) {
      try {
        await Product.deleteOne({ id: req.params.id });
      } catch (e) {
        console.warn('Mongo delete product notice:', e.message);
      }
    }
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Materials & Brands
app.get('/api/materials', (req, res) => {
  res.json(localStore.getMaterials());
});

// Inquiries / Leads (from Landing Page contact & consultation form)
app.get('/api/inquiries', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mInqs = await Inquiry.find().sort({ createdAt: -1 });
      if (mInqs && mInqs.length > 0) return res.json(mInqs);
    }
    res.json(localStore.getInquiries());
  } catch (err) {
    res.json(localStore.getInquiries());
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, city, service, budget, propertyType, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required' });
    }
    const newInquiry = localStore.addInquiry({
      name,
      phone,
      email: email || '',
      city: city || 'Kovilpatti',
      service: service || 'Modular Interior Consultation',
      budget: budget || 'Standard Package',
      propertyType: propertyType || 'Residential Apartment / House',
      message: message || ''
    });

    if (isMongoConnected) {
      try {
        await Inquiry.create(newInquiry);
      } catch (e) {
        console.warn('Mongo inquiry error:', e.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Our Modshine interior designer will call you shortly.',
      inquiry: newInquiry
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = localStore.updateInquiryStatus(req.params.id, status);
    if (isMongoConnected) {
      try {
        await Inquiry.findOneAndUpdate({ id: req.params.id }, { status });
      } catch (e) {
        console.warn('Mongo update inquiry notice:', e.message);
      }
    }
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true, inquiry: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const success = localStore.deleteInquiry(req.params.id);
    if (isMongoConnected) {
      try {
        await Inquiry.deleteOne({ id: req.params.id });
      } catch (e) {
        console.warn('Mongo delete inquiry notice:', e.message);
      }
    }
    if (!success) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset to seed data
app.post('/api/seed', (req, res) => {
  localStore.resetDefaults();
  res.json({ success: true, message: 'Database reset to default presentation showcase data' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Modshine Interior Server running at http://127.0.0.1:${PORT}`);
});
