import mongoose from 'mongoose';
import { cleanJSON } from './_json.js';

const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  tokenSecret: { type: String, required: true },
  passwordChangedAt: { type: Number, default: () => Date.now() },
}, { timestamps: true, toJSON: cleanJSON });

export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
