import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavStyles from '../../styles/NavStyles';

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

// All the authenticated  routes will go here
const authenticatedRoutes = () => {
  return <Fragment />;
};

const NavigationItems = () => <NavStyles>{guestRoutes()}</NavStyles>;
export default NavigationItems;
