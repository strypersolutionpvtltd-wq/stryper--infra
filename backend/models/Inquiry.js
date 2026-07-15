const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, default: '' },
  phone:   { type: String, required: true },
  service: { type: String, default: 'Full Home Interior' },
  message: { type: String, default: '' },
  status:  { type: String, enum: ['new', 'contacted', 'in-progress', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
