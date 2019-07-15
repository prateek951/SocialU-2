/**
 * @desc Code for the user login
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledForm from '../../styles/FormStyles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
// import ErrorMessage from "./ErrorMessage";
// import isEmpty from "../validation/is-empty";

const PageLogin = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Pull out the email and the password from the input form data
  const { email, password } = formData;

  // Pull out the login user action from the props
  const { loginUser, isAuthenticated } = props;

  const handleChange = event => {
    setFormData({ ...setFormData, [event.target.name]: event.target.value });
  };
  const handleLogin = event => {
    event.preventDefault();
    loginUser(email, password);
  };

  // Redirect to the main page if you are authenticated

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <StyledForm method="POST" onSubmit={handleLogin}>
      <fieldset>
        <h2 className="large text-primary">Login</h2>
        <p className="lead">
          <i className="fas fa-user" /> Sign into Your Account
        </p>
        {/* <ErrorMessage error={this.state.error} /> */}
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </fieldset>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </StyledForm>
  );
};

PageLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(PageLogin);
