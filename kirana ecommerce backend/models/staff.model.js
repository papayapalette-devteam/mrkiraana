const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  joiningDate: {
    type: Date,
    required: true
  },

  role: {
    type: String,
    enum: ['Admin', 'Staff'],
    default: 'Staff',
    required: true,
    set: v => (typeof v === 'string' ? v.trim() : v)
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },

  image: {
    type: Array // store filename or full URL to the uploaded image
  }

}, { timestamps: true });

const StaffModel = mongoose.model('Staff', staffSchema);

module.exports = StaffModel;
