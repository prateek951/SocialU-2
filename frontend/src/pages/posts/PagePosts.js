import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import Spinner from '../../components/layout/Spinner';
import PostItem from '../../components/post/PostItem';
import PostForm from '../../components/post/PostForm';

const PagePosts = ({ postReducerState: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  console.log(posts);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Socialize and Connect across Continents
      </p>
      <PostForm />
      <div className="posts">
        {posts.length > 0 ? (
          posts.map(post => <PostItem key={post._id} post={post} />)
        ) : (
          <h1>There are no posts to show.</h1>
        )}
      </div>
    </Fragment>
  );
};

PagePosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postReducerState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postReducerState: state.postReducer
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PagePosts);
