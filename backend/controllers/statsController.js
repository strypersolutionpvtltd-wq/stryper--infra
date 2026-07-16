const Project  = require('../models/Project');
const Blog     = require('../models/Blog');
const Inquiry  = require('../models/Inquiry');
const Career   = require('../models/Career');
const Visit    = require('../models/Visit');

// GET /api/stats — admin only
const getStats = async (req, res) => {
  try {
    const [
      projects, blogs, inquiries, careers,
      newInquiries, newCareers,
      pageviews, visitors
    ] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Inquiry.countDocuments(),
      Career.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Career.countDocuments({ status: 'new' }),
      // Total pageviews = total visit records
      Visit.countDocuments(),
      // Unique visitors = distinct sessionIds
      Visit.distinct('sessionId').then(ids => ids.filter(id => id).length)
    ]);

    res.json({
      success: true,
      data: {
        projects,
        blogs,
        inquiries,
        careers,
        newInquiries,
        newCareers,
        visitors,
        pageviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/stats/increment — public (called on every page load)
const incrementPageview = async (req, res) => {
  try {
    const { url = '/', sessionId = '' } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
            || req.socket?.remoteAddress
            || '';

    await Visit.create({ url, sessionId, ip });
    res.json({ success: true });
  } catch (err) {
    // Never fail silently — analytics should never break the site
    res.json({ success: true });
  }
};

module.exports = { getStats, incrementPageview };
