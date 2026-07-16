const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  url:       { type: String, default: '/' },
  sessionId: { type: String, default: '' },   // unique visitor tracking
  ip:        { type: String, default: '' },
  browser:   { type: String, default: 'Unknown' },
  os:        { type: String, default: 'Unknown' },
  device:    { type: String, default: 'Desktop' },  // Desktop / Mobile / Tablet
  userAgent: { type: String, default: '' },
  referrer:  { type: String, default: 'Direct' },
  country:   { type: String, default: 'India' }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    // Store in UTC but we display in IST on frontend
  }
});

// Index for quick queries
visitSchema.index({ sessionId: 1 });
visitSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Visit', visitSchema);
