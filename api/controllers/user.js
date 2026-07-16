import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Transaction from "../models/Transaction.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, name, email, password, phone, city, country } = req.body;

    // التحقق من وجود جميع الحقول المطلوبة
    if (!username || !name || !email || !password) {
      throw new Error("Missing required fields: username, name, email, or password");
    }

    // التحقق من القيود الفريدة
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error(
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
      city,
      country,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

// بقية الدوال كما هي
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.id });
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};