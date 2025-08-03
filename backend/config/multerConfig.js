const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Automatically create folder if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Default to products folder
    let folder = 'uploads/products';

    // If this is a profile upload, use profiles folder
    if (req.baseUrl.includes('/user') || req.originalUrl.includes('profile')) {
      folder = 'uploads/profiles';
    }

    ensureDir(folder); // Make sure folder exists
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
