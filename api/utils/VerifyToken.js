import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// 1. تفعيل dotenv لضمان قراءة متغير البيئة JWT من ملف الـ .env بنجاح
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  // 2. الفحص يتم هنا باستخدام process.env.JWT المشحون من الـ .env
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // التأكد من وجود كائن req.user قبل قراءة الـ id والـ isAdmin
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      return res.status(403).json({ message: "Not authorized!" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("verifyAdmin req.user:", req.user); 
    // 3. التأكد من صلاحية الأدمن بشكل آمن
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Not authorized as admin!" });
    }
  });
};
