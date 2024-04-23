const express = require('express');
const Blog = require('../models/Blog');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const getBlog = require('../middlewares/blog/getBlog');
const router = express.Router();

// CREATE BLOG
router.post('/create', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, preview, content, cover } = req.body;
    const blog = new Blog({ title, preview, content, cover });
    await blog.save();
    res.status(201).json({ 
      message: "Blog created",
      blog,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BLOG
router.patch('/:id', authenticationToken, getBlog, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, preview, content, cover } = req.body;
    res.blog.title = title;
    res.blog.preview = preview;
    res.blog.content = content;
    res.blog.cover = cover;
    await res.blog.save();
    res.status(200).json({ 
      message: "Blog updated",
      blog: res.blog,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BLOGS
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BLOG BY ID
router.get('/:id', getBlog, async (req, res) => {
  try {
    res.status(200).json(res.blog);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BLOG
router.delete('/:id', authenticationToken, getBlog, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    console.log(res.blog);
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json(error); 
  }
});

module.exports = router;