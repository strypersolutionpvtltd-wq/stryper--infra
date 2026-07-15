const express = require('express');
const router = express.Router();
const { getAll, getOne, create, remove } = require('../controllers/blogsController');
const { verifyToken } = require('../middleware/auth');

// GET /api/blogs         — public (optional ?category=Commercial)
router.get('/', getAll);

// GET /api/blogs/:slug   — public
router.get('/:slug', getOne);

// POST /api/blogs        — admin only
router.post('/', verifyToken, create);

// DELETE /api/blogs/:slug — admin only
router.delete('/:slug', verifyToken, remove);

module.exports = router;
