const Series = require('../../models/Series');

const getSeries = async (req, res, next) => {
  try {
    const id = req.params.id;
    const series = await Series.findById(id);
    if (!series) return res.status(404).json({ message: "Series not found" });
    res.series = series;
    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = getSeries;