import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileAbout from '../../components/profile/ProfileAbout';
import ProfileExperienceSection from '../../components/profile/ProfileExperienceSection';
import ProfileEducationSection from '../../components/profile/ProfileEducationSection';
import ProfileGithubSection from '../../components/profile/ProfileGithubSection';
const SingleProfile = ({
  profileReducerState: { profile, loading },
  auth,
  getProfileById,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.userId);
    //eslint-disable-next-line
  }, [getProfileById, match.params.userId]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperienceSection
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials.</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducationSection
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubUsername && (
              <ProfileGithubSection username={profile.githubUsername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};


SingleProfile.propTypes = {
  profileReducerState: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    profileReducerState: state.profileReducer,
    auth: state.authReducer
  };
};
export default connect(
  mapStateToProps,
  {
    getProfileById
  }
)(withRouter(SingleProfile));
