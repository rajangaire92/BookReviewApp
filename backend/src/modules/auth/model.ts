import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});
export const UserModel = mongoose.model("User", userSchema);
