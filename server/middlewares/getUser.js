const User = require('../models/User');

const getUser = async (req, res, next) => {
  let user
  try {
    const id = req.params.id;
    user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
  res.user = user;
  next();
}

module.exports = getUser;