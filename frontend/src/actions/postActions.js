import axios from 'axios';
import { setAlert } from './alertAction';
import { GET_POSTS, POST_ERROR } from './types';

// Action to get the list of all the posts

export const getPosts = () => async dispatch => {
  try {
    // 1. Hit the backend with the request to fetch the list of all the posts
    const response = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
