const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/auth');
const HTTP_STATUS_CODES = require('http-status-codes');
const { check, validationResult } = require('express-validator');
/**
 * @route GET /api/profile/me
 * @desc Get the currently authenticated user's profile
 * @access Private
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

/**
 * @route POST /api/profile
 * @desc Create or update the user profile
 * @access Private
 */
const validationChecks = [
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty()
];

router.post('/', [authMiddleware, validationChecks], async (req, res) => {
  // 1. Check for the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      errors: errors.array()
    });
  }
  // 2. If there are no errors, create a new profile
  // Pull out all the fields from the body of the request

  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // 3. Create a profile object
  const newProfileObj = {};
  // 4. Tap in all the values for the new profile
  newProfileObj.user = req.user.id;
  newProfileObj.company = company ? company : '';
  newProfileObj.website = website ? website : '';
  newProfileObj.location = location ? location : '';
  newProfileObj.bio = bio ? bio : '';
  newProfileObj.status = status ? status : '';
  newProfileObj.githubUsername = githubUsername ? githubUsername : '';
  newProfileObj.skills = skills
    ? skills.split(',').map(skill => skill.trim())
    : [];
  // 5. Create a social object
  newProfileObj.social = {};
  newProfileObj.social.youtube = youtube ? youtube : '';
  newProfileObj.social.twitter = twitter ? twitter : '';
  newProfileObj.social.facebook = facebook ? facebook : '';
  newProfileObj.social.linkedin = linkedin ? linkedin : '';
  newProfileObj.social.instagram = instagram ? instagram : '';

  // res.send('Hello');
  try {
    // 6. Check whether the requested user already has an existing
    // profile
    const existingProfile = await Profile.findOne({ user: req.user.id });

    // 7. If does have an existing profile
    if (existingProfile) {
      // 8. Update the profile if existing profile
      const updateProfileObj = newProfileObj;
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: updateProfileObj },
        { new: true }
      );
      return res.status(HTTP_STATUS_CODES.OK).json(updatedProfile);
    }
    // 9. If there is no existing profile, create a new profile
    const createdProfile = new Profile(newProfileObj);
    // 10. Save the created profile
    await createdProfile.save();
    res.status(HTTP_STATUS_CODES.CREATED).json(createdProfile);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route GET /api/profile/all
 * @desc Retrieve all the profiles
 * @access Public
 */
router.get('/all', async (req, res) => {
  try {
    // 1. Query for all the profiles and for each profile populate
    // the name and the avatar from the user
    const profiles = await Profile.find({}).populate('user', [
      'name',
      'avatar'
    ]);
    // 2. Return the profiles as json response
    res.status(HTTP_STATUS_CODES.OK).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

module.exports = router;
