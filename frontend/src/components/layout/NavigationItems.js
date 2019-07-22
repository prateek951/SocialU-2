import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavStyles from '../../styles/NavStyles';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
const NavigationItems = ({
  auth: { isAuthenticated, loading },
  logoutUser
}) => {
  // All the guest routes will go here
  const guestRoutes = () => {
    return (
      <Fragment>
        <li>
          <Link to="/profiles">
            <span>Profiles</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <span>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>Login</span>
          </Link>
        </li>
      </Fragment>
    );
  };
  const logMeOut = () => {
    logoutUser();
  };

  // All the authenticated  routes will go here
  const authenticatedRoutes = () => {
    return (
      <Fragment>
        <li>
          <Link to="/profiles">
            <span className="hide-sm">Profiles</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" />{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <button onClick={logMeOut}>
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">Logout</span>
          </button>
        </li>
      </Fragment>
    );
  };

  return (
    <NavStyles>
      {!loading && (isAuthenticated ? authenticatedRoutes() : guestRoutes())}
    </NavStyles>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};
NavigationItems.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationItems);
