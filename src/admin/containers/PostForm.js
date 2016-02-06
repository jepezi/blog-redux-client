import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { createPost } from '../redux/modules/posts';

const s = require('./Post.module.scss');

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownsrc: this.props.post
        ? this.props.post.body
        : ''
    };
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
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

  handleSave() {
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
      .then(() => {
        this.context.router.push({
          pathname: '/posts',
          null, // eslint-disable-line
          state: { flash: 'success' }
        });
      })
  }

  render() {
    let error = '';

    if (this.props.error) {
      error = `Error! ${this.props.error.message}`;
    }

    if (this.state.errors) {
      error = `Error! ${this.state.errors}`;
    }

    return <div className={s.container}>
      {error}

      <h4>Title</h4>
      <div>
        <input
          ref={r => this._title = r}
          type="text"
          defaultValue=""
          placeholder="Title"
          className="form-control"
        />
      </div>

      <h4>Body</h4>
      <textarea
        onChange={this.handleTextChange}
        value={this.state.markdownsrc}
        className={`${s.editor} form-control`}
        rows="8"
      />

      <h5>Preview</h5>
      <ReactMarkdown
        source={this.state.markdownsrc}
      />

      <button
        type="submit" onClick={this.handleSave}
        className="btn btn-primary"
      >
        Create
      </button>
    </div>;
  }
}

PostForm.propTypes = {
  post: PropTypes.array,
  dispatch: PropTypes.func,
  error: PropTypes.object,
};

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
