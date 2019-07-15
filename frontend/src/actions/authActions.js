/**
 * @param {Payload} payload
 * @returns {Object} An Action
 */

import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from './types';
import axios from 'axios';
import { setAlert } from './alertAction';
import { setAuthToken } from '../utils/setAuthToken';

/**
 * @desc Load the user
 * @param {Payload} payload
 * @returns {Object} An Action
 */

export const loadUser = () => async (dispatch, getState) => {
  // 1. Check whether there is a token in the local storage

  if (localStorage.token) {
    // 2. If we have the token in the local storage,
    // set the token in the global headers s
    setAuthToken(localStorage.token);
  }

  try {
    // 3. Get the loaded user
    const { data: user } = await axios.get('/api/auth');
    // 4. Dispatch the user loaded action
    dispatch({
      type: USER_LOADED,
      payload: user
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

/**
 * @desc Register a new user
 * @param {Payload} payload: { name, email, password }
 * @returns {Object} Dispatches an success or failure action based on registration
 */

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

    // 5. Once the registration is done dispatch the load user00 action
    dispatch(loadUser());
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

/**
 * @desc Login the user
 * @param {Payload} payload: { email, password }
 * @returns {Object} Dispatches an success or failure action based on successful login or not
 */

export const loginUser = (email, password) => async (dispatch, getState) => {
  // 1. Hit the backend with the config and the data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // 2. Create the body of the formData that is to be sent
  const body = JSON.stringify({ email, password });

  try {
    // 3. Make the request to the backend to register the new user
    const response = await axios.post('/api/auth', body, config);
    // 4. Dispatch the Registration Success action along with
    // the registeredUser as the payload
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    // 5. Once the registration is done dispatch the load user00 action
    dispatch(loadUser());
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
      type: LOGIN_FAILURE
    });
  }
};

/**
 * @desc Logout  the user
 * @param {Payload}
 * @returns {Object} Dispatches an action to logout
 */

export const logoutUser = () => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT_USER
  });
};
