const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
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
    return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
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
 * @route GET /api/profile
 * @desc Retrieve all the profiles
 * @access Public
 */
router.get('/', async (req, res) => {
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

/**
 * @route GET /api/profile/user/:user_id
 * @desc Get the profile by the userId
 * @access Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    // 1. Query for the profile pertaining to the requested userid
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    // 2. Check for the existence of the profile
    if (!profile) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Profile not found.'
      });
    }
    // 2. Return the profile as json response
    res.status(HTTP_STATUS_CODES.OK).json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Profile not found'
      });
    }
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

/**
 * @route DELETE /api/profile
 * @desc Delete the profile, user pertaining to profile
 * @access Private
 */

router.delete('/', authMiddleware, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // 1. Find the profile by the requested user id and remove the profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // 2. In order to remove the user
    await User.findOneAndRemove({ _id: req.user.id });
    // 3. Send success response
    res.status(HTTP_STATUS_CODES.OK).json({ msg: 'User Deleted' });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route PUT /api/profile/experience
 * @desc Add profile experience
 * @access Private
 */

const experienceValidationChecks = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('company', 'Company is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty()
];

router.put(
  '/experience',
  [authMiddleware, experienceValidationChecks],
  async (req, res) => {
    // 1. Check for the validation errors
    const errors = validationResult(req);
    // 2. If there are validation errors, return errors as json response
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    // 3. If no errors, tap the data from request body
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    // 4. Create a new experience object
    const newExperienceObj = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      // 5. Fetch the profile for the requested user id
      const profile = await Profile.findOne({ user: req.user.id });
      // 5.5 If there is no profile pertaining to the requested user id
      // return profile not found as the response
      if (!profile) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          msg: 'Profile not found'
        });
      }
      // 6. Add the profile experience for the fetched profile
      profile.experience.unshift(newExperienceObj);
      // 7. Commit the changes by saving the updated profile
      await profile.save();
      // 8. Send the success response with the whole profile
      res.status(HTTP_STATUS_CODES.OK).json(profile);
    } catch (error) {
      console.error(error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }
);

/**
 * @route DELETE /api/profile/experience/:exp_id
 * @desc Delete the experience from profile
 * @access Private
 */

router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {
  // 1. Retrieve the experienceId from the request parameters
  const { exp_id: experienceId } = req.params;

  try {
    // 2. First fetch the profile pertaining to the requested user
    const profile = await Profile.findOne({ user: req.user.id });
    // 3. If the profile does not exists corresponding to this requested user
    // return bad request as response
    if (!profile) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Profile Not Found'
      });
    }
    // 4. If there is one such profile, then delete the experience corresponding
    // to experience id
    const indexOfExperienceToRemove = profile.experience
      .map(experienceItem => experienceItem.id)
      .indexOf(experienceId);
    // 5. Splice out that experience from the experiences of the profile
    profile.experience.splice(indexOfExperienceToRemove, 1);
    // 6. Commit the changes and save the profile
    await profile.save();
    // 7. Send the success response for successful deletion
    res.status(HTTP_STATUS_CODES.OK).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route PUT /api/profile/education
 * @desc Add profile education
 * @access Private
 */

const educationValidationChecks = [
  check('school', 'School is required')
    .not()
    .isEmpty(),
  check('degree', 'Degree is required')
    .not()
    .isEmpty(),
  check('fieldOfStudy', 'Field of Study is required')
    .not()
    .isEmpty(),
  check('from', 'From Date is required')
    .not()
    .isEmpty()
];

router.put(
  '/education',
  [authMiddleware, educationValidationChecks],
  async (req, res) => {
    // 1. Check for the validation errors
    const errors = validationResult(req);
    // 2. If there are validation errors, return errors as json response
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    // 3. If no errors, tap the data from request body
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;
    // 4. Create a new education object
    const newEducationObj = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };
    try {
      // 5. Fetch the profile for the requested user id
      const profile = await Profile.findOne({ user: req.user.id });
      // 5.5 If there is no profile pertaining to the requested user id
      // return profile not found as the response
      if (!profile) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          msg: 'Profile not found'
        });
      }
      // 6. Add the profile education  for the fetched profile
      profile.education.unshift(newEducationObj);
      // 7. Commit the changes by saving the updated profile
      await profile.save();
      // 8. Send the success response with the whole profile
      res.status(HTTP_STATUS_CODES.OK).json(profile);
    } catch (error) {
      console.error(error);
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
    }
  }
);

/**
 * @route DELETE /api/profile/education/:edu_id
 * @desc Delete the education from the profile
 * @access Private
 */

router.delete('/education/:edu_id', authMiddleware, async (req, res) => {
  // 1. Retrieve the experienceId from the request parameters
  const { edu_id: educationId } = req.params;

  try {
    // 2. First fetch the profile pertaining to the requested user
    const profile = await Profile.findOne({ user: req.user.id });
    // 3. If the profile does not exists corresponding to this requested user
    // return profile not found as response
    if (!profile) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        msg: 'Profile Not Found'
      });
    }
    // 4. If there is one such profile, then delete the education corresponding
    // to experience id
    const indexOfEducationToRemove = profile.education
      .map(educationItem => educationItem.id)
      .indexOf(educationId);
    // 5. Splice out that educationItem from the education of the profile
    profile.education.splice(indexOfEducationToRemove, 1);
    // 6. Commit the changes and save the profile
    await profile.save();
    // 7. Send the success response for successful deletion
    res.status(HTTP_STATUS_CODES.OK).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
});

/**
 * @route GET /api/profile/github/:username
 * @desc Get the repositories pertaining to a user
 * @access Public
 */

router.get('/github/:username', async (req, res) => {
  // 1. Pull out the username from the request parameters
  const { username } = req.params;
  try {
    // 2. Create the request options object
    const requestOptions = {
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'GITHUB_CLIENT_ID'
      )}&client_secret=${config.get('GITHUB_CLIENT_SECRET')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js'
      }
    };
    // 3. Make the request to the github api
    request(requestOptions, (error, response, body) => {
      // 4. Check for error
      if (error) {
        console.error(error);
      }
      // 5. If the response status code is not success, send the json response of not found
      if (response.statusCode !== HTTP_STATUS_CODES.OK) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .json({ msg: 'No Github Profile Found' });
      }
      res.status(HTTP_STATUS_CODES.OK).json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send('Server error');
  }
}); 

module.exports = router;
