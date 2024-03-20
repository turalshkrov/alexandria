const User = require('../../models/User');

const checkUsername = async (req, res, next) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user.length) return res.status(409).json({ message: "Username is already taken" })
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
}

module.exports = checkUsername;