const Notification = require('../models/Notification');

// GET /api/notifications  — admin only
const getAll = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/notifications/unread-count  — admin only
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ success: true, data: { count } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/notifications/read  — mark all as read
const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/notifications/:id/read  — mark one as read
const markOneRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/notifications  — clear all
const clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ success: true, message: 'All notifications cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getUnreadCount, markAllRead, markOneRead, clearAll };
