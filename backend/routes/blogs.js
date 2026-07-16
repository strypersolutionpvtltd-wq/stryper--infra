const express = require('express');
const router = express.Router();
const { getAll, getOne, create, remove, update } = require('../controllers/blogsController');
const { verifyToken } = require('../middleware/auth');

// GET /api/blogs         — public (optional ?category=Commercial)
router.get('/', getAll);

// GET /api/blogs/:slug   — public
router.get('/:slug', getOne);

// POST /api/blogs        — admin only
router.post('/', verifyToken, create);

// PUT /api/blogs/:slug   — admin only
router.put('/:slug', verifyToken, update);

// DELETE /api/blogs/:slug — admin only
router.delete('/:slug', verifyToken, remove);

module.exports = router;
