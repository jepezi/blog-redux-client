import merge from 'lodash/merge';
import posts from './posts';

function greet(state = [], action) {
  if (action.type === 'greet') {
    return [...state,action.name]
  }
  return state;
}

function counter(state = 0, action) {
  if (action.type === 'increment') {
    return state + 1
  }
  return state;
}

function error(state = null, action) {
  if (action.error) {
    return action.payload || 'error!';
  }

  return state;
}

function entities(state = { posts: {} }, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }

  return state
}

function reducers(state = {}, action) {
  return {
    greet: greet(state.greet, action),
    counter: counter(state.counter, action),
    entities: entities(state.entities, action),
    posts: posts(state.posts, action),
    error: error(state.error, action),
  }
}

export default reducers;
