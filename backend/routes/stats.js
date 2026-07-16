const express = require('express');
const router  = express.Router();
const { getStats, getVisitDetails, incrementPageview } = require('../controllers/statsController');
const { verifyToken } = require('../middleware/auth');

// POST /api/stats/increment — public (every page visit)
router.post('/increment', incrementPageview);

// GET /api/stats  — admin only (dashboard counts)
router.get('/', verifyToken, getStats);

// GET /api/stats/visits  — admin only (detailed visitor table)
router.get('/visits', verifyToken, getVisitDetails);

module.exports = router;
