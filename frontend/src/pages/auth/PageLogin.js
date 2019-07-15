/**
 * @desc Code for the user login
 *
 */

import React, { useState } from 'react';
import StyledForm from '../../styles/FormStyles';
import { Link } from 'react-router-dom';
// import ErrorMessage from "./ErrorMessage";
// import isEmpty from "../validation/is-empty";

const PageLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Pull out the email and the password from the input form data
  const { email, password } = formData;

  const handleChange = event => {
    setFormData({ ...setFormData, [event.target.name]: event.target.value });
  };
  const handleLogin = event => {
    event.preventDefault();
    console.log('handleLogin handler triggered');
  };
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

export default PageLogin;
