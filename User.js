const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES, STATUS } = require('../config/constants');

const userSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLES), required: true },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE },
  lastLoginAt: { type: Date }
}, { timestamps: true });

// Compound index to ensure email is unique ONLY within a specific school (true multi-tenancy)
userSchema.index({ email: 1, schoolId: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
