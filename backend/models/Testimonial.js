const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  role:   { type: String, default: '' },
  text:   { type: String, default: '' },
  image:  { type: String, default: '' },
  rating: { type: Number, default: 5, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
