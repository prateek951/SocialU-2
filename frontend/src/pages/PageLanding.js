import React from 'react';
import { Link } from 'react-router-dom';

const PageLanding = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">SocialU</h1>
            <p className="lead">
              A platform to socialize and interact with the like-minded people
              who have a desire to change the world as a social good.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageLanding;
