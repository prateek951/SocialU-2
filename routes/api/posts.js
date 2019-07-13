const express = require('express');
const HTTP_STATUS_CODES = require('http-status-codes');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */

const postValidationChecks = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
];

router.post('/', [authMiddleware, postValidationChecks], async (req, res) => {
  // 1.Check for the post validation errors
  const errors = validationResult(req);
  // 2. If there are validation errors, return the validation error
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
      errors: errors.array()
    });
  }
  try {
    // 3. Fetch the user from the requested user id and exclude the password
    const user = await User.findById(req.user.id).select('-password');

    // 4. Pull out the text of the post from the request body
    const { text } = req.body;

    // 5. Pull out the name and the avatar from the user
    // 6. Create a new post
    const newPost = new Post({
      text,
      name : user.name,
      avatar : user.avatar,
      user: req.user.id
    });
    // 7. Save the post
    const post = await newPost.save();
    // 8. Send the post as response 201
    res.status(HTTP_STATUS_CODES.CREATED).json(post);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

module.exports = router;
