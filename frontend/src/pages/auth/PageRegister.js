/**
 * @desc Code for registration of the user
 *
 */

import React, { useState } from 'react';
import StyledForm from '../../styles/FormStyles';
// import ErrorMessage from './ErrorMessage';
// import isEmpty from '../validation/is-empty';

const PageRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleNameChange = e => setName(e.target.value);
  const handleChange = e => console.log(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Register event triggered');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <fieldset>
        <h2>Create Your Account</h2>
        {/* <ErrorMessage error={this.state.error} /> */}
        <label htmlFor="email">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label htmlFor="name">
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            value={confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </fieldset>
    </StyledForm>
  );
};

export default PageRegister;
