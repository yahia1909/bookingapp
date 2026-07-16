import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // الاسم الكامل
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // أضف type صريحًا
    city: { type: String }, // أضف type صريحًا
    country: { type: String }, // أضف type صريحًا
    img: { type: String }, // رابط الصورة
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
