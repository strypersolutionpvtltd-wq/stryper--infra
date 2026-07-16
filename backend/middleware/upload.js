const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// ─── Image Upload → Cloudinary ─────────────────────────────────────────────────
// Images go directly to Cloudinary under the "stryper/images" folder
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'stryper/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  }
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'), false);
    }
  }
});

// ─── Resume Upload → Local Disk ───────────────────────────────────────────────
// Resumes stored locally — served via /uploads/resumes/ static route
const path = require('path');
const fs = require('fs');

const resumesDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumesDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${base}_${Date.now()}${ext}`);
  }
});

const uploadResume = multer({
  storage: diskStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});

module.exports = { uploadImage, uploadResume };
