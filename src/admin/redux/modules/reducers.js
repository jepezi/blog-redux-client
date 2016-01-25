import merge from 'lodash/merge';
import posts from './posts';
import comments from './comments';

function error(state = null, action) {
  if (action.type === 'clear_error') {
    return null;
  } else if (action.error) {
    return action.payload;
  }

  return state;
}

function entities(state = { posts: {} }, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }

  return state
}

function user(state = null, action) {
  if (action.type === 'user/load') {
    return action.payload.result;
  }

  return state;
}

function reducers(state = {}, action) {
  return {
    entities: entities(state.entities, action),
    posts: posts(state.posts, action),
    error: error(state.error, action),
    user: user(state.user, action),
    comments: comments(state.comments, action),
  }
}

export default reducers;
