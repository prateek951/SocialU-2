import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../../components/layout/Spinner';
import DashboardActions from './DashboardActions';
import ProfileExperience from '../../components/dashboard-components/ProfileExperience';
import ProfileEducation from '../../components/dashboard-components/ProfileEducation';
const PageDashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profileState: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    //eslint-disable-next-line
  }, [getCurrentProfile]);
  // If  the loading is still going on and we have not got the profile,
  // show the spinner else render the profile
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ProfileExperience experience={profile.experience} />
          <ProfileEducation education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" />
              Delete my Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You do not have a profile yet!</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create a Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

PageDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer,
    profileState: state.profileReducer
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(PageDashboard);
