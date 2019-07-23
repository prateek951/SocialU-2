import axios from 'axios';
import { setAlert } from './alertAction';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from './types';
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

// Action to add a like to the post

export const addALike = postId => async dispatch => {
  // 1. Create a configuration object for the request
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // 1. Hit the backend with the request to add a new like
    const response = await axios.put(`/api/posts/like/${postId}`, null, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: response.data }
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

// Action to remove a like from a post (each user can only like a post one time,
// once liked he can remove his like by dispatching action)

export const removeALike = postId => async dispatch => {
  // 1. Create a configuration object for the request
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // 1. Hit the backend with the request to unlike a post
    const response = await axios.put(
      `/api/posts/unlike/${postId}`,
      null,
      config
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: response.data }
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

// Action to delete a post by the postid

export const deletePost = postId => async dispatch => {
  try {
    // 1. Hit the backend with the request to unlike a post
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
    dispatch(setAlert('Post successfully removed', 'success'));
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

// Action to add a new post
export const addPost = formData => async dispatch => {
  // 1. Create the configuration object
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // 2. Create a request to add a new post 
    const response = await axios.post('/api/posts',formData,config);
    
    dispatch({
      type: ADD_POST,
      payload: response.data
    });
    dispatch(setAlert('Post successfully added', 'success'));
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
