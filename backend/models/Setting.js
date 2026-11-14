import mongoose from 'mongoose';
import { cleanJSON } from './_json.js';

// Site content is a flexible document edited from the admin studio.
// `strict: false` lets new content sections be stored without schema changes.
const SettingSchema = new mongoose.Schema({
  companyName: { type: String, default: "Modshine Interior" },
  tagline: { type: String },
  motto: { type: String },
  phone: { type: String },
  secondaryPhone: { type: String },
  email: { type: String },
  website: { type: String },
  instagram: { type: String },
  address: { type: String },
  serviceCoverage: { type: String },
  workingHours: { type: String },
  announcement: { type: String },
}, { timestamps: true, strict: false, minimize: false, toJSON: cleanJSON });

export const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
