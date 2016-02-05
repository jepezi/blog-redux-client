import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetchData from '../../lib/fetchData.js';
import Header from '../components/Header';
import { getPosts } from '../redux/modules/posts';

class Posts extends Component {
  renderPosts() {
    if (this.props.error) {
      return <div>{this.props.error.message}</div>;
    }

    if (this.props.posts.isLoading) {
      return <div>Loading...</div>;
    }

    const posts = this.props.posts && this.props.posts.map(post => {
      return <div key={post.id}>
        <div className="post-preview">
          <Link to={"/posts/" + post.id}>
            <h2 className="post-title">
              {post.title}
            </h2>
            <h3 className="post-subtitle">
              {post.body.split(/\s+/, 20).join(' ') + '...'}
            </h3>
          </Link>
          <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014, {post.comments.length} comment(s)</p>
        </div>
        <hr />
      </div>
    });

    return posts
  }

  render() {
    return <div>
      <Header
        headerStyle={{backgroundImage: 'url("/img/post-bg.jpg")'}}
      >
        <h1>All Posts</h1>
        <hr className="small" />
      </Header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            {this.renderPosts()}
            <ul className="pager">
              <li className="next">
                <Link to="/posts">Older Posts &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
  }
}

function mapState(state) {
  return {
    posts: state.posts.ids.map(id => state.entities.posts[id]),
    error: state.error,
  }
}

const Connected = connect(mapState)(Posts);

const Fetched = fetchData(async function fetchDataFn(store) {
  await store.dispatch(getPosts())
})(Connected);

export default Fetched;
