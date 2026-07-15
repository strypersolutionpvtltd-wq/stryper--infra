const express = require('express');
const router = express.Router();
const { getAll, create, updateStatus, remove } = require('../controllers/careersController');
const { verifyToken } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');

// POST /api/careers           — public (job application with optional resume)
router.post('/', uploadResume.single('resume'), create);

// GET /api/careers            — admin only
router.get('/', verifyToken, getAll);

// PATCH /api/careers/:id/status — admin only
router.patch('/:id/status', verifyToken, updateStatus);

// DELETE /api/careers/:id    — admin only
router.delete('/:id', verifyToken, remove);

module.exports = router;
