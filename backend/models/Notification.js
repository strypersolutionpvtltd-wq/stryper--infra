const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
