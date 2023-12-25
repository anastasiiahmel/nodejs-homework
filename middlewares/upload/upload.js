const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filterFile = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extension not allow"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerConfig,
  filterFile,
});

module.exports = upload;
