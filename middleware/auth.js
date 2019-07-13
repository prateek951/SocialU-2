const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const HTTP_STATUS_CODES = require('http-status-codes');
const jwtSecret = config.get('JWT_SECRET');

/**
 * @params (req:request, res:response, next)
 * @desc Middleware function
 */

module.exports = function(req, res, next) {
  // 1. Get token from  the header
  const token = req.header('x-auth-token');
  // 2. Check for the token
  if (!token) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ msg: 'No token, authorization denied' });
  }
  // 3. Verify the token
  try {
    const decodedToken = jsonwebtoken.verify(token, jwtSecret);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
      msg: 'Token is not valid'
    });
  }
};
