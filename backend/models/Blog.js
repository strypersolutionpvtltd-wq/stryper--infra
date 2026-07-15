const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  slug:     { type: String, unique: true, required: true },
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
  category: { type: String, default: 'General' },
  image:    { type: String, default: '' },
  date:     { type: String, default: '' },
  author:   { type: String, default: 'Stryper Editorial' },
  content:  { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
