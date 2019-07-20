import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_USER
} from '../actions/types';

// 1. Create the initial state for the auth state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
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
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      // 1. Set the token inside the localStorage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTRATION_FAILURE:
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT_USER:
      // 1. Remove the token from the local storage
      localStorage.removeItem('token');
      // 2. Clear everything out
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