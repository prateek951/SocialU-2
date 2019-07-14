import React from 'react';

const AppNavbar = () => {
  return (
    <li className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-code" /> SocialU
        </a>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <a href="register.html">Register</a>
        </li>
        <li>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </li>
  );
};

export default AppNavbar;
