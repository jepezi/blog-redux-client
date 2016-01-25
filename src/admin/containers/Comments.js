import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getComments } from '../redux/modules/comments';
import s from './Comments.module.scss';

class Comments extends Component {
  componentDidMount() {
    this.props.dispatch(getComments())
  }

  renderComments() {
    const { comments, posts } = this.props;

    if (!comments.length) {
      return <div>No comments.</div>;
    }

    return comments.map((comment, i) => {
      return <div key={comment.id} style={{marginBottom: 20}}>
        <h3>{comment.body}</h3>
        <p>by {comment.name}, in <Link to={'/posts/'+comment.post_id} className={s.name}>{posts[comment.post_id].title}</Link></p>
      </div>
    })
  }

  render() {
    if (this.props.isLoadingComments) {
      return <div>Loading...</div>
    }

    return <div className={s.container}>
      <h1 style={{marginBottom: 40}}>All Comments</h1>
      <h2 style={{marginBottom: 20, color: '#999'}}>{this.props.comments.length} comments</h2>
      <div>{this.renderComments()}</div>
    </div>;
  }
}

function mapState(state) {
  return {
    comments: state.comments.ids.map(id => state.entities.comments[id]),
    posts: state.entities.posts,
    isLoadingComments: state.comments.isLoading
  };
}
export default connect(mapState)(Comments);
