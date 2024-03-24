const Blog = require('../../models/Blog');

const getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.blog = blog;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getBlog;