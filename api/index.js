import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import uploadRoute from './routes/upload.js';
import ordersRoute from './routes/orders.js';

const app = express();
dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ MongoDB connection error:", error);
}

app.get('/', (req, res) => {
  res.send('hello');
});
app.use(cors({
  origin: "*", // رابط موقعك على Vercel
  credentials: true // ضروري إذا كنت تستخدم الـ cookies أو الـ token
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/upload', uploadRoute); // أضف هذا لربط نهاية الرفع
app.use('/uploads', express.static('uploads'));
app.use('/api/orders', ordersRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(8800, () => {
  console.log("🚀 Server running on port 8800");
});

