import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { getPost, updatePost, createPost } from '../redux/modules/posts';

const s = require('./Post.module.scss');

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { markdownsrc: this.props.post ? this.props.post.body : '' }
  }

  handleTextChange(e) {
    this.setState({
      markdownsrc: e.target.value
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.post) {
  //     this.setState({
  //       markdownsrc: nextProps.post.body
  //     });
  //   }
  // }

  handleSave(e) {
    const title = this._title.value;
    const body = this.state.markdownsrc;

    if (title === '' || body === '') {
      return this.setState({
        errors: 'fields required'
      });
    }

    this.props.dispatch(createPost({
      title: this._title.value,
      body: this.state.markdownsrc
    }))
      .then(action => {
        this.context.router.push({
          pathname: '/posts',
          null,
          state: {flash: 'success'}
        });
      })
  }

  render() {
    let error = '';

    if (this.props.error) {
      error = 'Error! ' + this.props.error.message;
    }

    if (this.state.errors) {
      error = 'Error! ' + this.state.errors;
    }

    return <div className={s.container}>
      {error}

      <div><input ref={r => this._title = r} type="text" defaultValue="" placeholder="Title" /></div>

      <textarea
        onChange={this.handleTextChange.bind(this)}
        value={this.state.markdownsrc}
        className={s.editor}
        rows="8"
      />

      <ReactMarkdown
        source={this.state.markdownsrc}
      />

      <button type="submit" onClick={this.handleSave.bind(this)}>Save</button>
    </div>;
  }
}

PostForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(
  (state, props) => ({
    post: state.entities.posts[props.params.id],
    error: state.error,
    isLoadingPosts: state.posts.isLoading,
  })
)(PostForm);
