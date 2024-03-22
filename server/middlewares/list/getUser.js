const User = require('../../models/User');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    req.body.user = req.user.userId;
    if (user) {
      res.user = user;
      return next();
    } else {
      res.status(404).json({
        message: "User not found",
      })
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getUser;