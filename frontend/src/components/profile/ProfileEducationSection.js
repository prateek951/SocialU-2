import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEducationSection = ({
  education: { school, degree, fieldOfStudy, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment>-{' '}
        {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong> {description.slice(0, 25)}
      </p>
    </div>
  );
};

ProfileEducationSection.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducationSection;
