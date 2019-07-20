const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const HTTP_STATUS_CODES = require('http-status-codes');
const authMiddleware = require('../../middleware/auth');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
/**
 * @route GET /api/auth
 * @desc Get the user who just registered
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

/**
 * @route POST /api/auth
 * @desc Login the user
 * @access Public
 */

const loginValidationChecks = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

router.post('/', loginValidationChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  // Pull out the email and password from the body of the request
  const { email, password } = req.body;

  try {
    // 1. Check for the user existence
    const existingUser = await User.findOne({ email });
    // 2. If the user does not exists pertaining to the input email, then throw bad request as the response
    if (!existingUser) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        errors: [{ msg: 'Invalid credentials' }]
      });
    }
    // 3. If the user with the given email does exists,
    // compare the input password with the hash of the password that is stored in the database as the user.password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        errors: [{ msg: 'Invalid credentials' }]
      });
    }

    // 8. Generate a JWT and send it as a response so the user
    // can immediately login
    const payload = {
      user: {
        id: existingUser.id
      }
    };
    jsonwebtoken.sign(
      payload,
      config.get('JWT_SECRET'),
      {
        expiresIn: 360000
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
    // res.status(HTTP_STATUS_CODES.OK).send('user registered');
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

module.exports = router;
