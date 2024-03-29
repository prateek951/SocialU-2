import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';
import Moment from 'react-moment';
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
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
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            onClick={() => deleteComment(postId, _id)}
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
