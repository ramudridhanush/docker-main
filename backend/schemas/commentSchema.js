const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now },
});


module.exports = commentSchema;