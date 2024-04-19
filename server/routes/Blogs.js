const express = require('express');
const Blog = require('../models/Blog');
const authenticationToken = require('../middlewares/auth/authenticationToken');
const getBlog = require('../middlewares/blog/getBlog');
const router = express.Router();

// CREATE BLOG
router.post('/create', authenticationToken, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, preview, content } = req.body;
    const blog = new Blog({ title, preview, content, tags });
    await blog.save();
    res.status(201).json({ message: "Blog created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BLOG
router.patch('/:id', authenticationToken, getBlog, async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(409).json({ message: "Access denied" });
    const { title, preview, content, tags } = req.body;
    res.blog.title = title;
    res.blog.preview = preview;
    res.blog.content = content;
    if (tags) res.blog.tags = tags;
    await res.blog.save();
    res.status(200).json({ message: "Blog updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BLOGS
router.get('/', async (req, res) => {
  try {
    let searchKey = req.query.search || "";
    searchKey = searchKey.toLowerCase();
    const blogs = await Blog.find();
    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchKey));
    res.status(200).json(filteredBlogs);
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