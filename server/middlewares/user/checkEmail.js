const User = require('../../models/User');

const checkEmail = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length) return res.status(409).json({ message: "Email is already registered" });
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
}

module.exports = checkEmail;