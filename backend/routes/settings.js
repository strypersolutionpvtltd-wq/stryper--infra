const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// In-memory settings store (persists while server runs)
// In production, move this to a DB model
let siteSettings = {
  phone: '+91 9565310410',
  email: 'gc@stryperinteriorandinfra.com',
  address: 'Pan India Projects',
  whatsapp: '918448590303',
  est: '2010',
  website: 'www.stryperinteriorandinfra.com'
};

// GET /api/settings/public — public (no auth)
router.get('/public', (req, res) => {
  res.json({ success: true, data: siteSettings });
});

// GET /api/settings — admin only
router.get('/', verifyToken, (req, res) => {
  res.json({ success: true, data: siteSettings });
});

// PUT /api/settings — admin only
router.put('/', verifyToken, (req, res) => {
  const { phone, email, address, whatsapp, est, website } = req.body;
  siteSettings = {
    phone:    phone    || siteSettings.phone,
    email:    email    || siteSettings.email,
    address:  address  || siteSettings.address,
    whatsapp: whatsapp || siteSettings.whatsapp,
    est:      est      || siteSettings.est,
    website:  website  || siteSettings.website
  };
  res.json({ success: true, data: siteSettings, message: 'Settings updated' });
});

module.exports = router;
