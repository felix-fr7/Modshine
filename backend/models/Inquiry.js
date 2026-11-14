import mongoose from 'mongoose';
import { cleanJSON } from './_json.js';

const InquirySchema = new mongoose.Schema({
  id: { type: String, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String },
  service: { type: String },
  budget: { type: String },
  propertyType: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'In-Progress', 'Completed'], default: 'New' }
}, { timestamps: true, toJSON: cleanJSON });

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
