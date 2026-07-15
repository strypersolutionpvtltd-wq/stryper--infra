const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug:        { type: String, unique: true, required: true },
  title:       { type: String, required: true },
  category:    { type: String, enum: ['Residential', 'Commercial', 'Hospitality', 'Infrastructure'], default: 'Residential' },
  location:    { type: String, default: '' },
  client:      { type: String, default: '' },
  area:        { type: String, default: '' },
  duration:    { type: String, default: '' },
  description: { type: String, default: '' },
  features:    [{ type: String }],
  image:       { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
