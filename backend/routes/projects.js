const express = require('express');
const router = express.Router();
const { getAll, getOne, create, remove, update } = require('../controllers/projectsController');
const { verifyToken } = require('../middleware/auth');

// GET /api/projects         — public (optional ?category=Residential)
router.get('/', getAll);

// GET /api/projects/:slug   — public
router.get('/:slug', getOne);

// POST /api/projects        — admin only
router.post('/', verifyToken, create);

// PUT /api/projects/:slug   — admin only
router.put('/:slug', verifyToken, update);

// DELETE /api/projects/:slug — admin only
router.delete('/:slug', verifyToken, remove);

module.exports = router;
