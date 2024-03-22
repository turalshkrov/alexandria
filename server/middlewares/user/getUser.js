const User = require('../../models/User');

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length !== 24) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(id).populate('lists');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getUser;