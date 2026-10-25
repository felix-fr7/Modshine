import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'express'; // placeholder import, will import real mongoose below
import {
  initialSettings,
  initialCategories,
  initialProducts,
  initialMaterials,
  initialInquiries
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// In-Memory & Local JSON persistent storage
class LocalStore {
  constructor() {
    this.data = {
      settings: { ...initialSettings },
      categories: [...initialCategories],
      products: [...initialProducts],
      materials: [...initialMaterials],
      inquiries: [...initialInquiries]
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.products && parsed.products.length > 0) {
          this.data = parsed;
          return;
        }
      }
    } catch (err) {
      console.warn("Could not read db.json, using seed defaults:", err.message);
    }
    this.save();
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error("Failed to write to db.json:", err.message);
    }
  }

  // Settings
  getSettings() {
    return this.data.settings;
  }
  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }

  // Categories
  getCategories() {
    return this.data.categories;
  }
  addCategory(category) {
    const id = category.id || `cat-${Date.now()}`;
    const newCat = { ...category, id };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  // Products
  getProducts(filters = {}) {
    let list = [...this.data.products];
    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category === filters.category);
    }
    if (filters.featured === 'true' || filters.featured === true) {
      list = list.filter(p => p.featured === true);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getProductById(id) {
    return this.data.products.find(p => p.id === id) || null;
  }

  addProduct(product) {
    const id = product.id || `prod-${Date.now()}`;
    const newProd = {
      id,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      featured: false,
      ...product
    };
    this.data.products.unshift(newProd);
    this.save();
    return newProd;
  }

  updateProduct(id, updates) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.save();
    return this.data.products[idx];
  }

  deleteProduct(id) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.data.products.splice(idx, 1);
    this.save();
    return true;
  }

  // Materials
  getMaterials() {
    return this.data.materials;
  }

  // Inquiries / Leads
  getInquiries() {
    return this.data.inquiries;
  }

  addInquiry(inquiry) {
    const id = `inq-${Date.now()}`;
    const newInq = {
      id,
      status: "New",
      createdAt: new Date().toISOString(),
      ...inquiry
    };
    this.data.inquiries.unshift(newInq);
    this.save();
    return newInq;
  }

  updateInquiryStatus(id, status) {
    const item = this.data.inquiries.find(i => i.id === id);
    if (!item) return null;
    item.status = status;
    this.save();
    return item;
  }

  deleteInquiry(id) {
    const idx = this.data.inquiries.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.data.inquiries.splice(idx, 1);
    this.save();
    return true;
  }

  // Reset to seed
  resetDefaults() {
    this.data = {
      settings: { ...initialSettings },
      categories: [...initialCategories],
      products: [...initialProducts],
      materials: [...initialMaterials],
      inquiries: [...initialInquiries]
    };
    this.save();
    return true;
  }
}

export const localStore = new LocalStore();
