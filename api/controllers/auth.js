import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT, { expiresIn: "1h" });
    res.status(200).json({
      details: { username: user.username, isAdmin: user.isAdmin, _id: user._id }, // تأكد من هذا السطر
      token,
    });
  } catch (error) {
    next(error);
  }
};


export const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin || false,
    });
    await newUser.save();
    res.status(201).json("User has been created.");
  } catch (error) {
    next(error);
  }
};