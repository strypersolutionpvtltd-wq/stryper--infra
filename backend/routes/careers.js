const express = require('express');
const router = express.Router();
const { getAll, create, updateStatus, remove } = require('../controllers/careersController');
const { verifyToken } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');
const https = require('https');
const http = require('http');
const Career = require('../models/Career');

// POST /api/careers           — public (job application with optional resume)
router.post('/', uploadResume.single('resume'), create);

// GET /api/careers            — admin only
router.get('/', verifyToken, getAll);

// GET /api/careers/:id/resume — serve resume file
router.get('/:id/resume', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id).select('resume_name resume_path');
    if (!career || !career.resume_path) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const resumePath = career.resume_path;
    const filename = career.resume_name || 'resume.pdf';

    // Local file path (new uploads)
    if (resumePath.startsWith('/uploads/')) {
      const fs = require('fs');
      const path = require('path');
      const absPath = path.join(__dirname, '..', resumePath);
      if (!fs.existsSync(absPath)) {
        return res.status(404).json({ success: false, message: 'File not found on server' });
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      return res.sendFile(absPath);
    }

    // Legacy Cloudinary URL — proxy it
    const url = resumePath.replace(/_pdf$/, '').replace(/\.pdf$/, '') + '.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (stream) => {
      if (stream.statusCode !== 200) {
        return res.status(404).json({ success: false, message: 'File not found on storage' });
      }
      stream.pipe(res);
    }).on('error', () => {
      res.status(500).json({ success: false, message: 'Failed to fetch resume' });
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/careers/:id/status — admin only
router.patch('/:id/status', verifyToken, updateStatus);

// DELETE /api/careers/:id    — admin only
router.delete('/:id', verifyToken, remove);

module.exports = router;
