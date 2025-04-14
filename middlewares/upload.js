const multer = require('multer');
const path = require('path');


//location where store images
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


//checking conditions
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  const mime = allowedTypes.test(file.mimetype);
  cb(null, ext && mime);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
