import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
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
  specifications: [{ label: String, value: String }],
  features: [String]
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
