import React from 'react';

// const AppNavbar = () => {
//   return (
//     <li className="navbar bg-dark">
//       <h1>
//         <a href="index.html">
//           <i className="fas fa-code" /> SocialU
//         </a>
//       </h1>
//       <ul>
//         <li>
//           <a href="profiles.html">Developers</a>
//         </li>
//         <li>
//           <a href="register.html">Register</a>
//         </li>
//         <li>
//           <a href="login.html">Login</a>
//         </li>
//       </ul>
//     </li>
//   );
// };

// export default AppNavbar;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavigationItems from './NavigationItems';

// Styles for the logo
const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  li {
    padding: 0.5rem 1rem;
    background: #000;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    list-style-type: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

// Styles for the navigation bar
const StyledNavbar = styled.header`
  .bar {
    border-bottom: 10px solid #000;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid #d3d3d3;
  }
`;

const AppNavbar = () => {
  return (
    <StyledNavbar>
      <div className="bar">
        <Logo>
          <Link to="/">
            <li>
              {' '}
              <i className="fas fa-code" /> SocialU
            </li>
          </Link>
        </Logo>
        <NavigationItems />
      </div>
    </StyledNavbar>
  );
};

export default AppNavbar;
