import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  tagline: { type: String },
  description: { type: String },
  image: { type: String },
  itemCount: { type: Number, default: 0 }
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

