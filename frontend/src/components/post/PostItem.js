import React, { Fragment } from 'react';
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
  deletePost,
  showActions
}) => {
  const paragraphStyles = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px'
  };
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1" style={paragraphStyles}>
          {text}
        </p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              type="button"
              onClick={() => addALike(_id)}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              onClick={() => removeALike(_id)}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                onClick={() => deletePost(_id)}
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
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

PostItem.defaultProps = {
  showActions: true
};

export default connect(
  mapStateToProps,
  { addALike, removeALike, deletePost }
)(PostItem);
