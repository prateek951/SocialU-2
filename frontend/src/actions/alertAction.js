/**
 * @param {Payload} payload
 * @returns {Object} An Action
 */

import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 2000) => (
  dispatch,
  getState
) => {
  const id = uuid.v4();
  dispatch({ type: SET_ALERT, payload: { msg, alertType, id } });

  // 1. Once alert is shown to the end user, dispatch another action to remove the
  // the alert after 5000 ms.
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout);
};
