const jwt = require('jsonwebtoken');
const UserRole = require('../../models/UserRole');

const authenticationToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.CRYPTR_SECRETKEY, async (err, data) => {
    if (err) return res.status(403).send('Invalid Token');
    const userRole = await UserRole.findOne({ userId: data.id });
    req.user = data.id;
    req.userRole = userRole.role;
    return next();
  });
}

module.exports = authenticationToken;