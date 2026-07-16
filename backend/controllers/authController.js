const { generateToken } = require('../middleware/auth');

let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'infra@@2026';

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
  res.json({ success: true, message: 'Token is valid', data: { role: 'admin' } });
};

// PUT /api/auth/change-password — admin only
const changePassword = (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both currentPassword and newPassword are required' });
    }
    if (currentPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    ADMIN_PASSWORD = newPassword;
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login, verify, changePassword };
