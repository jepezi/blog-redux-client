import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import fetchData from '../../lib/fetchData.js';

import Header from '../components/Header';
import { getPost } from '../redux/modules/posts';

class Post extends Component {
  render() {
    console.warn(this.props);
    if (this.props.isLoadingPosts || !this.props.post) {
      return <div>Loading...</div>;
    }

    const { post, comments } = this.props;

    return <div>
      <Header
        headerStyle={{backgroundImage: 'url("/img/post-bg.jpg")'}}
        headerClassname="post-heading"
      >
        <h1>{post.title}</h1>
        <span className="meta">March 20, 2015</span>
      </Header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <ReactMarkdown
              source={post.body}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <h3>Comments <span>({comments.length})</span></h3>
            {comments.map(comment => {
              return <div key={comment.id}>
                {comment.body} <span style={{'color': '#aaa'}}>by</span> <em>{comment.name}</em>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>;
  }
}

function mapState(state, props) {
  const post = state.entities.posts[props.params.id];
  const comments = post && post.comments && post.comments.map(id => state.entities.comments[id]);

  return {
    post,
    comments,
    error: state.error,
    isLoadingPosts: state.posts.isLoading,
  }
}

const Connected = connect(mapState)(Post);

const Fetched = fetchData(async function fetchDataFn(store, params) {
  await store.dispatch(getPost(params.id))
})(Connected);

export default Fetched;
