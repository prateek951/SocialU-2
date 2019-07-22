/**
 * @desc Profile Actions go here
 */

import axios from 'axios';
import { setAlert } from './alertAction';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

// Action to get the current profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    // 1. Make a request to the backend to get the current user profile
    const response = await axios.get('/api/profile/me');
    // 2. Dispatch an action with the response data to set the current profile in
    // profile reducer state
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    // 3. Dispatch PROFILE_ERROR if an error occurs
    console.error(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
// Action to create or update the profile

export const createProfile = (
  profileData,
  history,
  edit = false
) => async dispatch => {
  // 1. Create the config object
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // 2. Stringify the form data before making the api call
  const body = JSON.stringify(profileData);
  try {
    // 2. Hit the backend to create a new profile
    const response = await axios.post('/api/profile', body, config);
    // 3. Dispatch an action to get the newly created profile
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
    // 4. Dispatch the alert action and set message based on whether edit or create
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    // 5. Dispatch PROFILE_ERROR if an error occurs
    console.error(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add Experience action

export const addExperience = (formData, history) => async dispatch => {
  // 1. Create the config object
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    // 2. Hit the backend to create a new profile
    const response = await axios.put(
      '/api/profile/experience',
      formData,
      config
    );
    // 3. Dispatch an action to get the newly created profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    // 4. Dispatch the alert action and set message based on whether edit or create
    dispatch(setAlert('Experience Added', 'success'));
    // 5. Once you have added the experience redirect to the dashboard
    history.push('/dashboard');
  } catch (error) {
    // 5. Dispatch PROFILE_ERROR if an error occurs
    console.error(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add Education add

export const addEducation = (formData, history) => async dispatch => {
  // 1. Set the config objec
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    // 2. Hit the backend with a PUT request to update the profile with education data
    const response = await axios.put(
      '/api/profile/education',
      formData,
      config
    );
    // 3. Dispatch the update profile action
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    // 4. Dispatch the success alert
    dispatch(setAlert('Education added', 'success'));
    // Redirect to the dashboard
    history.push('/dashboard');
  } catch (error) {
    // 5. Dispatch PROFILE_ERROR if an error occurs
    console.error(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete experience
export const deleteExperience = experienceId => async dispatch => {
  try {
    // 1. Hit the backend with the delete request to delete a specific experience pertaining to the experience id
    const response = await axios.delete(
      `/api/profile/experience/${experienceId}`
    );
    // 2. Dispatch the update profile action once the profile experience has been
    // successfully deleted
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    // 3. Once the profile has been successfully deleted, do a success alert
    dispatch(setAlert('This experience is now removed', 'success'));
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status }
    });
  }
};

// Delete the education
export const deleteEducation = educationId => async (dispatch, getState) => {
  try {
    // 1. Hit the backend with a delete request to delete the specific education
    const response = await axios.delete(
      `/api/profile/education/${educationId}`
    );
    // 2. Dispatch an action to make the deletion happen on the frontend
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    // 3. Dispatch the success alert action once the deletion is done
    dispatch(setAlert('This education data is now removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch, getState) => {
  // 1. Take confirmation from the user whether he wants to delete his account or not
  if (
    window.confirm(
      'This action is irreversible, are you sure that you want to delete your account? '
    )
  ) {
    try {
      // 1. Hit the backend with the delete request to delete the account
      const response = await axios.delete(`/api/profile`);
      // 2. Dispatch an action to clear the profile
      dispatch({
        type: CLEAR_PROFILE
      });
      // 3. Dispatch an action that the profile got successfully deleted
      dispatch({
        type: ACCOUNT_DELETED
      });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};
