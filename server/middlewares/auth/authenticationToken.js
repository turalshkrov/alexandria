const jwt = require('jsonwebtoken');
const UserRole = require('../../models/UserRole');

const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, data) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = data.id;
    return next();
  });
}

module.exports = authenticationToken;