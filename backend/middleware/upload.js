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

// ─── Resume Upload → Cloudinary (raw resource type) ───────────────────────────
// Resumes go to Cloudinary under "stryper/resumes" folder as raw files
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'stryper/resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx']
  }
});

const uploadResume = multer({
  storage: resumeStorage,
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
