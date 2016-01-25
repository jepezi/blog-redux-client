import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { getPost, updatePost } from '../redux/modules/posts';

const s = require('./Post.module.scss');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { markdownsrc: this.props.post ? this.props.post.body : '' }
  }

  componentDidMount() {
    this.props.dispatch(getPost(this.props.params.id))
  }

  handleTextChange(e) {
    this.setState({
      markdownsrc: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    // In case we visit the route directly, post props will be undefined first.
    if (nextProps.post) {
      this.setState({
        markdownsrc: nextProps.post.body
      });
    }
  }

  handleSave(e) {
    const title = this._title.value;
    const body = this.state.markdownsrc;

    if (title === '' || body === '') {
      return this.setState({
        errors: 'fields required'
      });
    } else {
      this.setState({
        errors: null
      });
    }

    this.props.dispatch(updatePost(this.props.params.id, {
      title,
      body
    }))
      .then(action => {
        this.context.router.push({
          pathname: '/posts/' + this.props.params.id,
          null,
          state: {flash: 'success'}
        });
      })
  }

  renderComments() {
    const { comments } = this.props;

    if (!comments) {
      return <div>No comments.</div>;
    }

    const lists = comments
      .map((comment, i) => {
        return <div key={i} style={{marginBottom: 20}}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
        </div>
      });

    return <div>
      <h3>Comments</h3>
      {lists}
    </div>
  }

  render() {
    let error = '';

    if (this.props.error) {
      error = 'Error! ' + this.props.error.message;
    }

    if (this.state.errors) {
      error = 'Error! ' + this.state.errors;
    }
    // const post = this.props.posts.find(post => +post.id === +this.props.params.id);
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    return <div className={s.container}>
      {error}

      <div><input ref={r => this._title = r} type="text" defaultValue={post.title} placeholder="Title" /></div>

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

      {this.renderComments()}

    </div>;
  }
}

Post.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  const post = state.entities.posts[props.params.id];
  const comments = post && post.comments && post.comments.map(id => state.entities.comments[id]);

  return {
    post,
    comments,
    error: state.error,
    isLoadingPosts: state.posts.isLoading,
  }
}
export default connect(mapStateToProps)(Post);
