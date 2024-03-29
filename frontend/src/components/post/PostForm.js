import React, { useState } from 'react';
import StyledForm from '../../styles/FormStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const createPost = event => {
    event.preventDefault();
    addPost({ text });
    setText('');
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <StyledForm className="form my-1" onSubmit={createPost}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Create a new post"
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </StyledForm>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
