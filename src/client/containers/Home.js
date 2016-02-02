import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetchData from '../../lib/fetchData.js';
import Header from '../components/Header';
import Counter from '../components/Counter';
import { getPosts } from '../redux/modules/posts';
import s from './Home.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderPosts() {
    if (this.props.error) {
      return <div>{this.props.error.message}</div>;
    }

    if (this.props.isLoadingPosts) {
      return <div>Loading...</div>;
    }

    const posts = this.props.posts && this.props.posts.map(post => {
      return <div key={post.id}>
        <div className="post-preview">
          <Link to="/posts/1">
            <h2 className="post-title">
              {post.title}
            </h2>
            <h3 className="post-subtitle">
              {post.body}
            </h3>
          </Link>
          <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
        </div>
        <hr />
      </div>
    });

    return posts
  }

  render() {
    return <div>
      <Header
        headerStyle={{backgroundImage: 'url("/img/home-bg.jpg")'}}
      >
        <h1 className={s.blogname}>Jip Blog</h1>
        <hr className="small" />
        <span className="subheading">A Clean Blog Theme by Start Bootstrap</span>
        <button className="btn btn-primary" onClick={this.toggle.bind(this)}>Toggle</button>
        <Counter />
      </Header>

      {this.state.isOpen && <div className="container">
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
      </div>}
    </div>;
  }
}

function mapState(state) {
  return {
    posts: state.posts.ids.map(id => state.entities.posts[id]).slice(0,4),
    error: state.error,
    isLoadingPosts: state.posts.isLoading,
  }
}

const Connected = connect(mapState)(Home);

const Fetched = fetchData(function fetchDataFn(store) {
  store.dispatch(getPosts())
})(Connected);

export default Fetched;
