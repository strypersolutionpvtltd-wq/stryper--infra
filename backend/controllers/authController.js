const { generateToken } = require('../middleware/auth');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'infra@@2026';

// POST /api/auth/login
const login = (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = generateToken();
    res.json({
      success: true,
      message: 'Login successful',
      data: { token, role: 'admin' }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/verify  — verify if current token is valid
const verify = (req, res) => {
  // If this route is reached, verifyToken middleware already passed
  res.json({ success: true, message: 'Token is valid', data: { role: 'admin' } });
};

module.exports = { login, verify };
