const express = require('express');
const blogController = require('../controllers/blogControllers');
const router = express.Router();

router.post("/", blogController.createBlog);

router.get("/getUsers", blogController.getAllBlogs);

router.get("/:id", blogController.getBlogById);

router.put("/:id", blogController.updateBlog);

router.post("/:id/comments", blogController.addCommentToBlog);

router.delete("/:id", blogController.deleteBlog);

module.exports = router;
