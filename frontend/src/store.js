import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// 1. Define the initial state
const INITIAL_STATE = {};
// 2. Define the array of the middlewares that are required
const middleware = [thunk];

// 3. Define the store

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
