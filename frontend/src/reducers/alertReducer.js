import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// 1. Define the initial state
const initialState = [];

/**
 * @param {Array} state - Default application state
 * @param {Object} action: {type, payload} - Action from action creator
 * @returns {Object} New state
 */

// 2. Create the reducer and export it
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};
