/**
 * @param {Payload} payload
 * @returns {Object} An Action
 */

import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from './types';
import axios from 'axios';
import { setAlert } from './alertAction';
export const registerUser = ({ name, email, password }) => async (
  dispatch,
  getState
) => {
  // 1. Hit the backend with the config and the data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // 2. Create the body of the formData that is to be sent
  const body = JSON.stringify({ name, email, password });

  try {
    // 3. Make the request to the backend to register the new user
    const { data: registeredUser } = await axios.post(
      '/api/users',
      body,
      config
    );
    // 4. Dispatch the Registration Success action along with
    // the registeredUser as the payload
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: registeredUser
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    console.error(error);
    // 4. Dispatch the Registration Success action along with
    // the registeredUser as the payload
    dispatch({
      type: REGISTRATION_FAILURE
    });
  }
};
