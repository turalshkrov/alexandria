const Series = require('../../models/Series');

const getSeries = async (req, res, next) => {
  try {
    const seriesId = req.body.series;
    if (!seriesId) return next();
    const series = await Series.findById(seriesId);
    if (!series) return res.status(404).json({ message: "Series not found" });
    res.series = series;
    return next();
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = getSeries;