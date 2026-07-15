const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/login — public
router.post('/login', login);

// GET /api/auth/verify — protected
router.get('/verify', verifyToken, verify);

module.exports = router;
