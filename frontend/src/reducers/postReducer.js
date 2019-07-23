import { GET_POSTS, POST_ERROR } from '../actions/types';

// 1. Create the initial state for the post reducer
const INITIAL_STATE = {
  posts: [],
  post: null,
  error: {},
  loading: true
};
/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
