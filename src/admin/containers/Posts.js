import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getPosts } from '../redux/modules/posts';
import s from './Posts.module.scss';

class Posts extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts())
  }

  renderPosts() {
    const { posts } = this.props;

    if (!posts.length) {
      return <div>No posts.</div>;
    }

    return posts.map((post, i) => {
      return <div key={i} style={{marginBottom: 20}}>
        <Link to={'/posts/'+post.id} className={s.title}>{post.title}</Link>
      </div>
    })
  }

  render() {
    const s = require('./Posts.module.scss');

    if (this.props.isLoadingPosts) {
      return <div>Loading...</div>
    }
    return <div className={s.container}>
      <h1 style={{marginBottom: 40}}>All Posts</h1>
      <h2 style={{marginBottom: 20, color: '#999'}}>{this.props.posts.length} posts</h2>
      <div>{this.renderPosts()}</div>
    </div>;
  }
}

function mapState(state) {
  return {
    posts: state.posts.ids.map(id => state.entities.posts[id]),
    isLoadingPosts: state.posts.isLoading
  };
}
export default connect(mapState)(Posts);
