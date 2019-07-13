const express = require('express');
const router = express.Router();
const HTTP_STATUS_CODES = require('http-status-codes');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
/**
 * @route GET /api/auth
 * @desc Test the route (protected)
 * @access Public
 */

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(HTTP_STATUS_CODES.OK).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

module.exports = router;
