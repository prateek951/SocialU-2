const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/auth');
const HTTP_STATUS_CODES = require('http-status-codes');

/**
 * @route GET /api/profile/me
 * @desc Get the currently authenticated user's profile
 * @access Public
 */

router.get('/me', authMiddleware, async (req, res) => {
  try {
    // 1.Query for the profile pertaining to the requested user0
    // and populate the user data into the profile
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    // 2.If the profile does not exists
    if (!profile) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'There is no profile pertaining to this user'
      });
    }
    // 3. If there is one, return as json response
    res.status(HTTP_STATUS_CODES.OK).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUS_CODES).send('Server error');
  }
});

module.exports = router;
