const Career       = require('../models/Career');
const Notification = require('../models/Notification');

// GET /api/careers  — admin only
const getAll = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, data: careers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/careers  — public (job application)
const create = async (req, res) => {
  try {
    const { name, email, phone, position, experience, portfolio, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
    }

    let resumeName = '';
    let resumePath = '';
    if (req.file) {
      resumeName = req.file.originalname;
      // Local file — accessible via /uploads/resumes/filename
      resumePath = `/uploads/resumes/${req.file.filename}`;
    }

    const career = await Career.create({
      name, email, phone, position, experience, portfolio,
      resume_name: resumeName,
      resume_path: resumePath,
      message: message || ''
    });

    await Notification.create({ text: `New job application from ${name}` });

    res.status(201).json({ success: true, data: career, message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/careers/:id/status  — admin only
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Use: ' + validStatuses.join(', ') });
    }

    const career = await Career.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!career) return res.status(404).json({ success: false, message: 'Application not found' });

    res.json({ success: true, data: career });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/careers/:id  — admin only
const remove = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, updateStatus, remove };
