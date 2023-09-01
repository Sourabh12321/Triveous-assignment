const jwt = require('jsonwebtoken');
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.KEY);

    // Attach user information to the request object
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };

    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};


module.exports = {
    auth
}