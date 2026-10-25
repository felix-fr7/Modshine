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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/modshine';

let isMongoConnected = false;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files (for images/assets)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// MongoDB Connection with Graceful Fallback
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2500
})
.then(() => {
  isMongoConnected = true;
  console.log('✅ Connected to MongoDB successfully!');
})
.catch((err) => {
  isMongoConnected = false;
  console.warn('⚠️ MongoDB not running or connection failed:', err.message);
  console.log('⚡ Active mode: Local JSON Engine (Fast, zero-config, persistent storage)');
});

// ================= API ROUTES =================

// Health & System status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Modshine Interior API',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'Local JSON Engine (Active)',
    timestamp: new Date().toISOString()
  });
});

// Overview stats for Admin dashboard
app.get('/api/overview', async (req, res) => {
  try {
    const products = localStore.getProducts();
    const categories = localStore.getCategories();
    const inquiries = localStore.getInquiries();
    const settings = localStore.getSettings();

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
      databaseMode: isMongoConnected ? 'MongoDB' : 'Local JSON Store'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Company Settings
app.get('/api/settings', (req, res) => {
  res.json(localStore.getSettings());
});

app.put('/api/settings', (req, res) => {
  try {
    const updated = localStore.updateSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json(localStore.getCategories());
});

app.post('/api/categories', (req, res) => {
  try {
    const cat = localStore.addCategory(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Products / Furniture Items
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const items = localStore.getProducts({ category, featured, search });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  const item = localStore.getProductById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Product not found' });
  res.json(item);
});

app.post('/api/products', async (req, res) => {
  try {
    const item = localStore.addProduct(req.body);
    // Also save to mongo if connected
    if (isMongoConnected) {
      try {
        await Product.create(req.body);
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
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const success = localStore.deleteProduct(req.params.id);
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
app.get('/api/inquiries', (req, res) => {
  res.json(localStore.getInquiries());
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
      budget: budget || '₹2,00,000 - ₹5,00,000',
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

app.put('/api/inquiries/:id', (req, res) => {
  try {
    const { status } = req.body;
    const updated = localStore.updateInquiryStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
    res.json({ success: true, inquiry: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const success = localStore.deleteInquiry(req.params.id);
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
