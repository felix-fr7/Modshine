import mongoose from 'mongoose';
import { cleanJSON } from './_json.js';

const ProductSchema = new mongoose.Schema({
  id: { type: String, index: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  categoryName: { type: String },
  priceRange: { type: String },
  startingPrice: { type: Number, default: 0 },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  boardType: { type: String },
  brand: { type: String },
  hardware: { type: String },
  finish: { type: String },
  description: { type: String },
  specifications: [{ _id: false, label: String, value: String }],
  features: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true, toJSON: cleanJSON });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
