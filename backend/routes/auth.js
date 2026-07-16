const express = require('express');
const router = express.Router();
const { login, verify, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/login — public
router.post('/login', login);

// GET /api/auth/verify — protected
router.get('/verify', verifyToken, verify);

// PUT /api/auth/change-password — protected
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
