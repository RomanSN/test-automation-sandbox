import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  author: String,
  dateCreated: Number,
});

export const articleModel = model("Article", articleSchema);