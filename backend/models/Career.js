const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  position:    { type: String, default: '' },
  experience:  { type: String, default: '' },
  portfolio:   { type: String, default: '' },
  resume_name: { type: String, default: '' },
  resume_path: { type: String, default: '' },
  message:     { type: String, default: '' },
  status:      { type: String, enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
