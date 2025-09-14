import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: Number,
  username: String,
  hash: String,
  fingerprint: String,
  isAdmin: { type: Boolean, default: false },
});

export const userModel = model("User", userSchema);
