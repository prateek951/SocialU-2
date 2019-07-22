import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileAbout from '../../components/profile/ProfileAbout';
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

            {/* <!-- Experience --> */}
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              <div>
                <h3 class="text-dark">Microsoft</h3>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position: </strong>Senior Developer
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
              <div>
                <h3 class="text-dark">Sun Microsystems</h3>
                <p>Nov 2004 - Nov 2011</p>
                <p>
                  <strong>Position: </strong>Systems Admin
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>

            {/* <!-- Education --> */}
            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Education</h2>
              <div>
                <h3>University Of Washington</h3>
                <p>Sep 1993 - June 1999</p>
                <p>
                  <strong>Degree: </strong>Masters
                </p>
                <p>
                  <strong>Field Of Study: </strong>Computer Science
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>

            {/* <!-- Github --> */}
            <div class="profile-github">
              <h2 class="text-primary my-1">
                <i class="fab fa-github" /> Github Repos
              </h2>
              <div class="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Repo One
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li class="badge badge-primary">Stars: 44</li>
                    <li class="badge badge-dark">Watchers: 21</li>
                    <li class="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
              <div class="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Repo Two
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li class="badge badge-primary">Stars: 44</li>
                    <li class="badge badge-dark">Watchers: 21</li>
                    <li class="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
            </div>
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
