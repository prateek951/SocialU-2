const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const router = express.Router();
const HTTP_STATUS_CODES = require('http-status-codes');
const { check, validationResult } = require('express-validator');
/**
 * @route POST /api/users
 * @desc  Register the new incoming user
 * @access Public
 */
const validationChecks = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
];

router.post('/', validationChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  // Check for the user existence
  const { name, email, password } = req.body;

  try {
    // 1. Check for the user existence
    const existingUser = await User.findOne({ email });
    // 2. If the user with the given email does exists, it is bad request
    if (existingUser) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        errors: [{ msg: 'User already exists' }]
      });
    }
    // 3. If the user with the given email does not exists, proceed
    // with creation of a new user along with the user's gravatar

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const user = new User({
      name,
      email,
      avatar,
      password
    });
    // 4. Generate a salt
    const salt = await bcrypt.genSalt(12);
    // 5. Hash the input password
    const hash = await bcrypt.hash(password, salt);
    // 6. Set the user's password to the computed hash
    user.password = hash;
    // 7. Save the user to the database
    await user.save();
    // 8. Generate a JWT and send it as a response so the user
    // can immediately login
    const payload = {
      user: {
        id: user.id
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
