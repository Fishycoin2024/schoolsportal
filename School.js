const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  logo: { type: String },
  currentAcademicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

// Ensure unique code
schoolSchema.index({ code: 1 });

module.exports = mongoose.model('School', schoolSchema);
