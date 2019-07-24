import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import StyledForm from '../../styles/FormStyles';
const PageEditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: ' ',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [showSocial, toggleShowSocial] = useState(false);

  useEffect(() => {
    // 1. Get the current profile
    getCurrentProfile();
    // 2. Set the form data if not loading and you have got the profile data
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubUsername:
        loading || !profile.githubUsername ? '' : profile.githubUsername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
    // eslint-disable-next-line
  }, [loading, getCurrentProfile]);

  // Pull out all the data pertaining to the profile creation
  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();
    // Edit the existing profile,
    // pass the edit mode as true
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Edit Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user" /> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <StyledForm className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <select name="status" value={status} onChange={handleChange}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={handleChange}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={handleChange}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={handleChange}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={handleChange}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubUsername"
              value={githubUsername}
              onChange={handleChange}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={handleChange}
            />
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={() => toggleShowSocial(!showSocial)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {showSocial ? (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube"/>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={handleChange}
                />
              </div>
            </Fragment>
          ) : null}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </StyledForm>
      </section>
    </Fragment>
  );
};

PageEditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profileReducer
  };
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(PageEditProfile));
