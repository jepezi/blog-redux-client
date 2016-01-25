import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import s from './Home.module.css';
import { getPosts } from '../redux/modules/posts';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts())
  }

  render() {
    if (! this.props.posts.length) {
      return <div>Loading...</div>
    }

    return <div className="container">
      <div>
        <h1>Admin Dashboard</h1>
        <h3 style={{color: '#999'}}>Stats</h3>
        <div>
          <h2>{this.props.posts.length} posts</h2>
        </div>
      </div>
    </div>;
  }
}

function mapState(state) {
  return {
    posts: state.posts.ids.map(id => state.entities.posts[id])
  };
}
export default connect(mapState)(Home);
