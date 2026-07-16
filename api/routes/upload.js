import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

const uploadsDir = "uploads";

// إنشاء المجلد إذا مش موجود
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // مثال: 1691234567890.jpg
  },
});

const upload = multer({ storage });

// رفع ملفات متعددة
router.post("/", upload.array("file"), (req, res) => {
  try {
    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ urls }); // استخدم { urls } لتطابق الكود في New.jsx
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

