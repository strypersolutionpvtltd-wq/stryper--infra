const Project      = require('../models/Project');
const Notification = require('../models/Notification');

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// GET /api/projects  — public (optional ?category=Residential)
const getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/projects/:slug  — public
const getOne = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/projects  — admin only
const create = async (req, res) => {
  try {
    const { title, category, location, client, area, duration, description, features, image } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const slug = slugify(title) + '-' + Date.now();
    const featureList = Array.isArray(features)
      ? features
      : (features ? features.split(',').map(f => f.trim()).filter(Boolean) : []);

    const project = await Project.create({ slug, title, category, location, client, area, duration, description, features: featureList, image: image || '' });

    await Notification.create({ text: `New project added: ${title}` });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/projects/:slug  — admin only
const remove = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/projects/:slug  — admin only
const update = async (req, res) => {
  try {
    const { title, category, location, client, area, duration, description, features, image } = req.body;
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    project.title = title || project.title;
    project.category = category || project.category;
    project.location = location || project.location;
    project.client = client || project.client;
    project.area = area || project.area;
    project.duration = duration || project.duration;
    project.description = description || project.description;
    
    if (features !== undefined) {
      project.features = Array.isArray(features)
        ? features
        : (features ? features.split(',').map(f => f.trim()).filter(Boolean) : []);
    }
    if (image !== undefined) {
      project.image = image;
    }

    await project.save();
    res.json({ success: true, data: project, message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getOne, create, remove, update };
