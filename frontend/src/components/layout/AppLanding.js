import React from 'react';

const AppLanding = () => {
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
              <a href="register.html" className="btn btn-primary">
                Sign Up
              </a>
              <a href="login.html" className="btn btn-light">
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppLanding;
