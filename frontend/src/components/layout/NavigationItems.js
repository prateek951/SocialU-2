import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
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
        <Link to="/profiles">
          <li>Developers</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </Fragment>
    );
  };
  const logMeOut = () => {
    logoutUser();
    return <Redirect to="/" />;
  };

  // All the authenticated  routes will go here
  const authenticatedRoutes = () => {
    return (
      <Fragment>
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
