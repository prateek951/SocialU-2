import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import StyledForm from '../../styles/FormStyles';

const CommentForm = ({ postId, addComment }) => {
  // Set the initial state
  const [text, setText] = useState('');
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment </h3>
      </div>
      <StyledForm
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Create a new comment"
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </StyledForm>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
