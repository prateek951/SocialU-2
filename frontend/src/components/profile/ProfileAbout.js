import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line" />
        </Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      {skills.length > 0 ? (
        <Fragment>
          <div className="skills">
            {skills.slice(0, skills.length / 4).map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fa fa-check" /> {skill}
              </div>
            ))}
          </div>
          <div className="skills">
            {skills
              .slice(skills.length / 4, skills.length / 2)
              .map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fa fa-check" /> {skill}
                </div>
              ))}
          </div>
          <div className="skills">
            {skills
              .slice(skills.length / 2, (3 * skills.length) / 4)
              .map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fa fa-check" /> {skill}
                </div>
              ))}
          </div>
          <div className="skills">
            {skills
              .slice((3 * skills.length) / 4, skills.length)
              .map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fa fa-check" /> {skill}
                </div>
              ))}
          </div>
        </Fragment>
      ) : (
        <h1>
          Fact : Profile with skills get 10x times more noticed from recruiters
          !
        </h1>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
