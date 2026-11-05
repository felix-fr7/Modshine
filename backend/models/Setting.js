import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  companyName: { type: String, default: "Modshine Interior" },
  tagline: { type: String, default: "Decorate Your Home The Easy Way" },
  motto: { type: String, default: "Design • Innovate • Create" },
  phone: { type: String, default: "+91 99944 12345" },
  secondaryPhone: { type: String, default: "082208 05159" },
  email: { type: String, default: "info@modshineinterior.com" },
  website: { type: String, default: "www.modshineinterior.com" },
  instagram: { type: String, default: "@modshine.interior" },
  address: { type: String, default: "24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501" },
  serviceCoverage: { type: String, default: "Full Tamil Nadu (All 38 Districts)" },
  workingHours: { type: String, default: "Monday - Sunday: 9:00 AM - 9:00 PM" },
  stats: { type: mongoose.Schema.Types.Mixed },
  announcement: { type: String },
  hero: { type: mongoose.Schema.Types.Mixed },
  about: { type: mongoose.Schema.Types.Mixed },
  services: { type: mongoose.Schema.Types.Mixed },
  materials: { type: mongoose.Schema.Types.Mixed },
  brands: { type: mongoose.Schema.Types.Mixed },
  processSteps: { type: mongoose.Schema.Types.Mixed },
  testimonials: { type: mongoose.Schema.Types.Mixed },
  footer: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
