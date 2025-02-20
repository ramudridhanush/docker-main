const commentSchema = require("./commentSchema");
const mongoose = require("mongoose");
const express = require('express')
const app = express()
app.use(express.json());



const blogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  keyword: { type: String, required: true },
  category: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  uploadedDate: { type: Date, required: true },
  readTime: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  summary: { type: String, required: true },
  content: { type: [String], required: true },
  images: { type: [String], required: true },
  comments: [commentSchema],
});

module.exports = blogSchema;