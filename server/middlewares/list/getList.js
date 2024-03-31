const List = require('../../models/List');

const getList = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length !== 24) {
      return res.status(404).json({ message: "List not found" });
    }
    const list = await List.findById(id).populate({
      path: 'books',
      populate: {
        path: 'author'
      }
    }).populate('user');
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.list = list;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getList;