const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const {
      id,
      title,
      author,
      keyword,
      category,
      isFavorite,
      uploadedDate,
      readTime,
      likes,
      summary,
      content,
      images,
    } = req.body;

    const newBlog = new Blog({
      id,
      title,
      author,
      keyword,
      category,
      isFavorite,
      uploadedDate,
      readTime,
      likes,
      summary,
      content,
      images,
      comments: [],
    });

    const savedBlog = await newBlog.save();
    if (savedBlog) {
      return res.json("Successfully posted blog");
    }
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

exports.updateBlog = async (req, res) => {
  console.log("Update request received for blog:", req.params.id);
  console.log("Request body:", req.body);

  try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (req.body.comments && Array.isArray(req.body.comments)) {
      console.log("Updating comments:", req.body.comments);
      blog.comments = req.body.comments;
    }

    Object.assign(blog, req.body);

    const updatedBlog = await blog.save();
    console.log("Blog updated successfully:", updatedBlog);

    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

exports.addCommentToBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const newComment = {
      id: Date.now().toString(),
      text: req.body.text,
      author: req.body.author || "Anonymous",
      date: new Date(),
    };

    blog.comments.push(newComment);
    const updatedBlog = await blog.save();

    res.status(201).json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({ id: req.params.id });
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};
