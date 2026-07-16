const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  url:       { type: String, default: '/' },
  sessionId: { type: String, default: '' },  // to track unique visitors
  ip:        { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
