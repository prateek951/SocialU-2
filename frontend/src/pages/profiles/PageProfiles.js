import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../../components/layout/Spinner';
import ProfileItem from '../../components/profiles/ProfileItem';
const PageProfiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    //eslint-disable-next-line
  }, [getProfiles]);

  console.log(profiles);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" />
            Socialize with people that think alike and work alike, the people
            who you care and love.
          </p>
          <div>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles Found.</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

PageProfiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(PageProfiles);
