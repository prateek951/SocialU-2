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
      name: user.name,
      avatar: user.avatar,
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

/**
 * @route GET /api/posts
 * @desc Get all the posts
 * @access Private
 */

router.get('/', authMiddleware, async (req, res) => {
  try {
    // 1. Query for all the posts and latest posts should appear at the top
    const posts = await Post.find({}).sort({ date: -1 });
    // 2. Send the success json response with the fetched posts
    res.status(HTTP_STATUS_CODES.OK).json(posts);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route GET /api/posts/:id
 * @desc Get a single posts by its id
 * @access Private
 */

router.get('/:id', authMiddleware, async (req, res) => {
  // 1. Pull out the post id from the request parameters
  const { id: postId } = req.params;
  try {
    // 2. Fetch the post by its id
    const post = await Post.findById(postId);
    // 3. Check if we got any post pertaining to this id
    if (!post) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post not found'
      });
    }
    // 4. Send the success json response with the post
    res.status(HTTP_STATUS_CODES.OK).json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post not found'
      });
    }
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route DELETE /api/posts/:id
 * @desc Delete a post by its id
 * @access Private
 */

router.delete('/:id', authMiddleware, async (req, res) => {
  // 1. Pull out the post id from the request parameters
  const { id: postId } = req.params;
  try {
    // 2. Fetch the post by its id
    const post = await Post.findById(postId);
    // 3. Check if we got any post pertaining to this id
    if (!post) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post not found'
      });
    }
    // 4. Check for ownership of the post.If you own the post, only then
    // you can delete the post
    if (post.user.toString() !== req.user.id.toString()) {
      return res
        .status(HTTP_STATUS_CODES.NETWORK_AUTHENTICATION_REQUIRED)
        .json({
          msg: 'Unauthorized'
        });
    }
    // 5. Remove the post
    await post.remove();
    // 6. Send the success json response with the post
    res.status(HTTP_STATUS_CODES.OK).json({ msg: 'Post successfully removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post not found'
      });
    }
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

module.exports = router;
