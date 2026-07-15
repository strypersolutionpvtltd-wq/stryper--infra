const express = require('express');
const router = express.Router();
const { getStats, incrementPageview } = require('../controllers/statsController');
const { verifyToken } = require('../middleware/auth');

// POST /api/stats/increment — public (page visit tracking)
router.post('/increment', incrementPageview);

// GET /api/stats            — admin only
router.get('/', verifyToken, getStats);

module.exports = router;
