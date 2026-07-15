const express = require('express');
const router = express.Router();
const { getAll, create, updateStatus, remove } = require('../controllers/inquiriesController');
const { verifyToken } = require('../middleware/auth');

// POST /api/inquiries           — public (contact form)
router.post('/', create);

// GET /api/inquiries            — admin only
router.get('/', verifyToken, getAll);

// PATCH /api/inquiries/:id/status — admin only
router.patch('/:id/status', verifyToken, updateStatus);

// DELETE /api/inquiries/:id    — admin only
router.delete('/:id', verifyToken, remove);

module.exports = router;
