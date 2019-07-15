import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertMessage from './AlertMessage';
const AppAlert = props => {
  // 1. Pull out the alerts from the props
  const { alerts } = props;
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => <AlertMessage key={alert.id} alert={alert} />)
  );
};

AppAlert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  alerts: state.alertReducer
});

export default connect(
  mapStateToProps,
  null
)(AppAlert);
