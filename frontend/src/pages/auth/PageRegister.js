/**
 * @desc Code for registration of the user
 *
 */

import React, { useState } from 'react';
// import axios from 'axios';
import StyledForm from '../../styles/FormStyles';
import { Link } from 'react-router-dom';
// import ErrorMessage from './ErrorMessage';
// import isEmpty from '../validation/is-empty';

const PageRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Pull out the name, email, password, confirmPassword from the formData
  const { name, email, password, confirmPassword } = formData;
  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleRegister = async event => {
    event.preventDefault();
    // 1. Check whether the passwords match, if match then allow registration
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };

  return (
    <StyledForm className="form" onSubmit={handleRegister}>
      <fieldset>
        <h2 className="large text-primary">
          <i className="fas fa-user" /> Create Your Account
        </h2>
        {/* <ErrorMessage error={this.state.error} /> */}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email">
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <small className="form-text">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
        <br />
        <p className="my-1">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </fieldset>
    </StyledForm>
  );
};

export default PageRegister;
