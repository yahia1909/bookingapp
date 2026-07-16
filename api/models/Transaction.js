import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ربط بالمستخدم
    trackingId: { type: String, required: true, unique: true },
    product: { type: String, required: true },
    img: { type: String },
    customer: { type: String, required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);