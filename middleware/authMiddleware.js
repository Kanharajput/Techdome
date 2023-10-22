// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(secretKey) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);

      if (decoded.role === 'Admin' || decoded.id === req.params.userId) {
        req.user = decoded; // Attach user info to the request for future reference
        next();
      } else {
        res.status(403).json({ message: 'Permission denied' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

module.exports = authMiddleware;
