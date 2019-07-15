import { REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from '../actions/types';

// 1. Create the initial state for the auth state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

// 2. Create the auth reducer and export the reducer

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_SUCCESS:
      // 1. Set the token inside the localStorage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTRATION_FAILURE:
      // 1. Remove the token from the local storage
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
