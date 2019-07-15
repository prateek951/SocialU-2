import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

// Styles for the alert
const AlertStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

// 1. Create the AlertMessage component

const AlertMessage = ({ alert }) => {
  if (!alert || !alert.msg) return null;
  return (
    <AlertStyles>
      <p className={`alert alert-${alert.alertType}`}>
        <strong>Validation Error:</strong>
        {alert.msg.replace('MongoDB error: ', '')}
      </p>
    </AlertStyles>
  );
};

AlertMessage.defaultProps = {
  alert: {}
};

AlertMessage.propTypes = {
  alert: PropTypes.object
};

export default AlertMessage;
