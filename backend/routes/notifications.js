const express = require('express');
const router = express.Router();
const { getAll, markAllRead, markOneRead, clearAll, getUnreadCount } = require('../controllers/notificationsController');
const { verifyToken } = require('../middleware/auth');

// All notification routes are admin-only
router.use(verifyToken);

// GET /api/notifications
router.get('/', getAll);

// GET /api/notifications/unread-count
router.get('/unread-count', getUnreadCount);

// PATCH /api/notifications/read — mark all as read
router.patch('/read', markAllRead);

// PATCH /api/notifications/:id/read — mark one as read
router.patch('/:id/read', markOneRead);

// DELETE /api/notifications — clear all
router.delete('/', clearAll);

module.exports = router;
