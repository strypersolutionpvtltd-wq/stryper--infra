const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'stryper_secret';

/**
 * Middleware: verify JWT token from Authorization header
 * Usage: router.get('/protected', verifyToken, controller)
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * Generate a JWT token for admin login
 */
const generateToken = () => {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
};

module.exports = { verifyToken, generateToken };
