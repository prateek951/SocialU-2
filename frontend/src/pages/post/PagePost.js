import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';

const PagePost = ({ match, postReducerState: { post, loading }, getPost }) => {
  useEffect(() => {
    return () => {
      getPost(match.params.postId);
    };
    //eslint-disable-next-line
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
    </Fragment>
  );
};

PagePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postReducerState: state.postReducer
});

export default connect(
  mapStateToProps,
  { getPost }
)(PagePost);
