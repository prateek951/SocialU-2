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

/**
 * @route PUT /api/posts/like/:postId
 * @desc Like a post
 * @access Private
 */

router.put('/like/:id', authMiddleware, async (req, res) => {
  // 1. Pull out the post id from the request parameters
  const { id: postId } = req.params;
  try {
    // 2. First fetch the post pertaining to the postId
    const post = await Post.findById(postId);
    // 3. If there is no post pertaining to this postId, return
    // post not found as json response
    if (!post) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post Not Found'
      });
    }
    // 4. If there is a post pertaining to this postId,
    // then check whether this post has already been liked by
    // this user
    const isAlreadyLiked =
      post.likes.filter(like => like.user.toString() === req.user.id).length >
      0;
    if (isAlreadyLiked) {
      // 5. If the post has already been liked then return the bad request response
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Post has already been liked'
      });
    } else {
      post.likes.unshift({ user: req.user.id });
      // 6. Commit the changes and save the post
      await post.save();
      // 7. Send the response with the post likes
      res.status(HTTP_STATUS_CODES.OK).json(post.likes);
    }
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route PUT /api/posts/unlike/:postId
 * @desc Unlike a specific post
 * @access Private
 */

router.put('/unlike/:id', authMiddleware, async (req, res) => {
  // 1. Pull out the post id from the request parameters
  const { id: postId } = req.params;
  try {
    // 2. First fetch the post pertaining to the postId
    const post = await Post.findById(postId);
    // 3. If there is no post pertaining to this postId, return
    // post not found as json response
    if (!post) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post Not Found'
      });
    }
    // 4. If there is a post pertaining to this postId,
    // then check whether this post has already been liked by
    // this user
    const isAlreadyLiked =
      post.likes.filter(like => like.user.toString() === req.user.id).length >
      0;
    if (isAlreadyLiked) {
      // 5. If the post has already been liked by the user only then he can unlike the post
      const indexOfLikeToUnlike = post.likes.findIndex(
        like => like.user.toString() === req.user.id
      );
      // 6. Splice out the like from the likes array
      post.likes.splice(indexOfLikeToUnlike, 1);
      // 7. Commit the changes and save the post
      await post.save();
      // 8. Send the response with the post likes
      res.status(HTTP_STATUS_CODES.OK).json(post.likes);
    } else {
      // 9. If the post has not been liked you cannot unlike bad request operation
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Post has not yet been liked'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route POST /api/posts/comment/:id
 * @desc Create a new comment on a specific post
 * @access Private
 */

const commentValidationChecks = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
];

router.post(
  '/comment/:id',
  [authMiddleware, commentValidationChecks],
  async (req, res) => {
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
      // 4. Find the post by the post id
      const post = await Post.findById(req.params.id);
      // 5. Pull out the text of the post from the request body
      const { text } = req.body;

      // 6. Create a new comment
      const newComment = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      // 7. Unshift the new comment to the post comments
      post.comments.unshift(newComment);
      // 8. Save the post
      await post.save();
      // 8. Send the comments as response 201
      res.status(HTTP_STATUS_CODES.CREATED).json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }
);

/**
 * @route POST /api/posts/comment/:id/:comment_id
 * @desc Delete a comment on a specific post by the comment id of the
 * comment. Here we will need the comment id since each user can have
 * several comments unlike likes which is one like per person per post.
 * @access Private
 */
router.delete('/comment/:id/:comment_id', authMiddleware, async (req, res) => {
  // 1. Pull out the post id and the comment id from request parameters
  const { id: postId, comment_id } = req.params;
  try {
    // 2. Fetch the post by the post id
    const post = await Post.findById(postId);
    // 3. If no post found pertaining to the post id return
    // not found as the json response
    if (!post) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        msg: 'Post not found'
      });
    }
    // 4. Make sure that the comment exists for the corresponding comment_id
    const comment = post.comments.find(comment => comment.id === comment_id);
    // 5. If the comment does not exists return not found json response
    if (!comment) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ msg: 'Comment Not Found' });
    }
    // 6. If the comment exists, check for the ownership of the comment
    // if you own the comment, then only you can delete it
    const isCommentOwnershipValid = comment.user.toString() === req.user.id;

    if (!isCommentOwnershipValid) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ msg: 'Unauthorized' });
    }
    // 7. Ownership is valid, delete the comment
    const indexOfCommentToRemove = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    // 8 Splice out the comment from the post comments
    post.comments.splice(indexOfCommentToRemove, 1);

    // 9. Commit changes and save the post
    await post.save();
    // 10. Success json response with post comments
    res.status(HTTP_STATUS_CODES.OK).json(post.comments);
    
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

module.exports = router;
