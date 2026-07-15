const express = require('express');
const router = express.Router();
const { uploadImage, uploadResume } = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth');

// POST /api/upload/image  [Admin only]
// File goes to Cloudinary → returns the Cloudinary URL
router.post('/image', verifyToken, uploadImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }
    // multer-storage-cloudinary puts the Cloudinary URL in req.file.path
    res.json({
      success: true,
      data: {
        url:          req.file.path,        // ← Cloudinary HTTPS URL
        public_id:    req.file.filename,    // ← Cloudinary public_id (for deletion later)
        originalName: req.file.originalname,
        size:         req.file.size
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/upload/resume  [Public — career application]
// Resume goes to Cloudinary as raw file → returns the Cloudinary URL
router.post('/resume', uploadResume.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No resume file uploaded' });
    }
    res.json({
      success: true,
      data: {
        url:          req.file.path,
        public_id:    req.file.filename,
        originalName: req.file.originalname,
        size:         req.file.size
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Multer / Cloudinary error handler
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File too large' });
  }
  res.status(400).json({ success: false, message: err.message });
});

module.exports = router;
