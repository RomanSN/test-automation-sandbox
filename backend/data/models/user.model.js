import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: Number,
  username: String,
  hash: String,
  fingerprint: String,
});

export const userModel = model("User", userSchema);
