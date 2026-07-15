const Testimonial  = require('../models/Testimonial');
const Notification = require('../models/Notification');

// GET /api/testimonials  — public
const getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/testimonials  — admin only
const create = async (req, res) => {
  try {
    const { name, role, text, image, rating } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    const testimonial = await Testimonial.create({ name, role, text, image: image || '', rating: rating || 5 });
    await Notification.create({ text: `New client review added by ${name}` });

    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/testimonials/:id  — admin only
const remove = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, remove };
