const Project      = require('../models/Project');
const Blog         = require('../models/Blog');
const Inquiry      = require('../models/Inquiry');
const Career       = require('../models/Career');
const Visit        = require('../models/Visit');

// ─── UA Parser helper (no external lib needed) ────────────────────────────────
const parseUserAgent = (ua = '') => {
  // Browser detection
  let browser = 'Unknown';
  if (ua.includes('Edg/') || ua.includes('Edge/'))   browser = 'Microsoft Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Chrome/') && !ua.includes('Chromium')) browser = 'Chrome';
  else if (ua.includes('Firefox/'))  browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('MSIE') || ua.includes('Trident/')) browser = 'Internet Explorer';
  else if (ua.includes('Chromium')) browser = 'Chromium';

  // OS detection
  let os = 'Unknown';
  if (ua.includes('Windows NT 10.0')) os = 'Windows 11/10';
  else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
  else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
  else if (ua.includes('Windows'))    os = 'Windows';
  else if (ua.includes('Mac OS X'))   os = 'macOS';
  else if (ua.includes('Android'))    os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux'))      os = 'Linux';

  // Device detection
  let device = 'Desktop';
  if (ua.includes('Mobile') || ua.includes('iPhone') || ua.includes('Android Mobile')) device = 'Mobile';
  else if (ua.includes('iPad') || ua.includes('Tablet')) device = 'Tablet';

  return { browser, os, device };
};

// ─── GET /api/stats  — admin only ─────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const [projects, blogs, inquiries, careers, newInquiries, newCareers, totalVisits, totalPageviews] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Inquiry.countDocuments(),
      Career.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Career.countDocuments({ status: 'new' }),
      Visit.distinct('ip').then(ips => ips.length),  // unique visitors by IP
      Visit.countDocuments()                          // total pageviews
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
        visitors:  totalVisits,
        pageviews: totalPageviews
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/stats/visits  — admin only — detailed visitor list ──────────────
const getVisitDetails = async (req, res) => {
  try {
    const page  = parseInt(req.query.page  || '1', 10);
    const limit = parseInt(req.query.limit || '50', 10);
    const skip  = (page - 1) * limit;
    const type  = req.query.type || 'all'; // 'all' | 'unique'

    let visits = [];
    let total = 0;

    if (type === 'unique') {
      // Group by IP, get the latest document for each unique IP
      const pipeline = [
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$ip",
            latestVisit: { $first: "$$ROOT" }
          }
        },
        { $replaceRoot: { newRoot: "$latestVisit" } },
        { $sort: { createdAt: -1 } }
      ];

      const countPipeline = [
        { $group: { _id: "$ip" } },
        { $count: "count" }
      ];

      const [countResult, paginatedVisits] = await Promise.all([
        Visit.aggregate(countPipeline),
        Visit.aggregate([...pipeline, { $skip: skip }, { $limit: limit }])
      ]);

      total = countResult[0] ? countResult[0].count : 0;
      visits = paginatedVisits;
    } else {
      // type === 'all'
      [visits, total] = await Promise.all([
        Visit.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Visit.countDocuments({})
      ]);
    }

    // Format to IST (UTC+5:30)
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const formatted = visits.map(v => ({
      _id:       v._id,
      url:       v.url,
      ip:        v.ip === '::1' ? 'localhost' : v.ip,
      browser:   v.browser || 'Unknown',
      os:        v.os     || 'Unknown',
      device:    v.device || 'Desktop',
      referrer:  v.referrer || 'Direct',
      sessionId: v.sessionId,
      // IST time
      visitedAt: new Date(new Date(v.createdAt).getTime() + IST_OFFSET)
        .toISOString()
        .replace('T', ' ')
        .replace('Z', '')
        .split('.')[0] + ' IST'
    }));

    res.json({
      success: true,
      data: {
        visits: formatted,
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/stats/increment  — public (called on every page visit) ─────────
const incrementPageview = async (req, res) => {
  try {
    const ua        = req.headers['user-agent'] || '';
    const { browser, os, device } = parseUserAgent(ua);
    const ip        = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
                      || req.socket?.remoteAddress
                      || 'unknown';
    const url       = req.body?.url || '/';
    const sessionId = req.body?.sessionId || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const referrer  = req.body?.referrer || req.headers['referer'] || 'Direct';

    await Visit.create({ url, sessionId, ip, browser, os, device, userAgent: ua, referrer });

    res.json({ success: true });
  } catch (err) {
    // Never let tracking errors break the user experience
    res.json({ success: true });
  }
};

module.exports = { getStats, getVisitDetails, incrementPageview };
