import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addALike, removeALike, deletePost } from '../../actions/postActions';
const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addALike,
  removeALike,
  deletePost
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          type="button"
          onClick={() => addALike(_id)}
          class="btn btn-light"
        >
          <i class="fas fa-thumbs-up" />{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          type="button"
          onClick={() => removeALike(_id)}
          class="btn btn-light"
        >
          <i class="fas fa-thumbs-down" />
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span class="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            onClick={() => deletePost(_id)}
            class="btn btn-danger"
          >
            <i class="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addALike: PropTypes.func.isRequired,
  removeALike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { addALike, removeALike, deletePost }
)(PostItem);
