const express = require('express');
const router = express.Router();
const { getAll, create, remove } = require('../controllers/testimonialsController');
const { verifyToken } = require('../middleware/auth');

// GET /api/testimonials   — public
router.get('/', getAll);

// POST /api/testimonials  — admin only
router.post('/', verifyToken, create);

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', verifyToken, remove);

module.exports = router;
