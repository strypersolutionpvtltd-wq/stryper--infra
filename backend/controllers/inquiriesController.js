const Inquiry      = require('../models/Inquiry');
const Notification = require('../models/Notification');

// GET /api/inquiries  — admin only
const getAll = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/inquiries  — public (contact form)
const create = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !phone) return res.status(400).json({ success: false, message: 'Name and phone are required' });

    const inquiry = await Inquiry.create({
      name, email, phone, service,
      message: message || 'Client initiated a direct consultation query.'
    });

    await Notification.create({ text: `New project Brief submitted by ${name}` });

    res.status(201).json({ success: true, data: inquiry, message: 'Inquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/inquiries/:id/status  — admin only
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'in-progress', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Use: ' + validStatuses.join(', ') });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });

    res.json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/inquiries/:id  — admin only
const remove = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, updateStatus, remove };
