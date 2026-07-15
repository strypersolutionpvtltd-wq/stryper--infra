const Project      = require('../models/Project');
const Blog         = require('../models/Blog');
const Inquiry      = require('../models/Inquiry');
const Career       = require('../models/Career');

// GET /api/stats  — admin only
const getStats = async (req, res) => {
  try {
    const [projects, blogs, inquiries, careers, newInquiries, newCareers] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Inquiry.countDocuments(),
      Career.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Career.countDocuments({ status: 'new' })
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
        // Visitor stats will come from Cloudflare/Vercel Analytics in production
        // For now returning placeholder values
        visitors: 114,
        pageviews: 254
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/stats/increment  — public (page visit tracking placeholder)
const incrementPageview = async (req, res) => {
  // In production, use analytics service (Cloudflare, Vercel, Plausible etc.)
  res.json({ success: true });
};

module.exports = { getStats, incrementPageview };
