const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // stores in memory for easy streaming to Cloudinary

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png) are allowed!"));
    }
  },
});

module.exports = { upload };
