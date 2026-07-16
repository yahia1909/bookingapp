import express from 'express';
import { createUser, deleteUser, getUser, getUsers, getUserTransactions, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/VerifyToken.js';

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createUser); // إضافة مسار POST لإنشاء المستخدم

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyAdmin, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);



router.get("/:id/transactions", verifyUser, getUserTransactions);

export default router;