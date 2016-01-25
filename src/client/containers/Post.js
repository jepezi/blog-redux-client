import React, { Component, PropTypes } from 'react';

import Header from '../components/Header';

class Post extends Component {
  render() {
    return <div>
      <Header
        headerStyle={{backgroundImage: 'url("/img/post-bg.jpg")'}}
        headerClassname="post-heading"
      >
        <h1>Post title</h1>
        <h2 className="subheading">Subheading</h2>
        <span className="meta">March 20, 2015</span>
      </Header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            Post body
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Post;
