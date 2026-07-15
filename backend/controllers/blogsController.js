const Blog         = require('../models/Blog');
const Notification = require('../models/Notification');

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// GET /api/blogs  — public
const getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/blogs/:slug  — public
const getOne = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/blogs  — admin only
const create = async (req, res) => {
  try {
    const { title, subtitle, category, image, author, content } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const slug = slugify(title) + '-' + Date.now();
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const blog = await Blog.create({ slug, title, subtitle, category, image: image || '', date, author: author || 'Stryper Editorial', content });

    await Notification.create({ text: `New blog published: ${title}` });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/blogs/:slug  — admin only
const remove = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, remove };
