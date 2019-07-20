/**
 * @desc Profile Actions go here
 */

import axios from 'axios';
import { setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR } from './types';

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
