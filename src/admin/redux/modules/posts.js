import superfetch from '../../../lib/superfetch';
import handleActions from '../../../lib/redux-actions/handleActions';
import union from 'lodash/union';

/**
 * Schema
 */
import { Schema, arrayOf } from 'normalizr';
const postSchema = new Schema('posts');
const commentSchema = new Schema('comments');

postSchema.define({
  comments: arrayOf(commentSchema),
});

const initialState = {
  isLoading: false,
  ids: []
};

// posts reducer
export default handleActions({
  'posts/get': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        ids: state.ids.length < action.payload.result.length
          ? action.payload.result
          : union([], state.ids, action.payload.result),
        isLoading: false
      };
    }
  },

  'getPost': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        ids: union([], state.ids, [action.payload.result]),
        isLoading: false
      };
    }
  },

  'updatePost': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        isLoading: false
      };
    }
  },

  'createPost': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        ids: union([], [action.payload.result], state.ids),
        isLoading: false
      };
    }
  }

}, initialState)

// action creators
export function getPosts() {
  return (dispatch, getState) => {
    const currentState = getState().posts.ids;
    // more than 2 means we have already loaded all posts
    // 1 means we visit PostRoute first
    if (currentState.length > 2) { return; }

    dispatch({type: 'clear_error'});

    return dispatch({
      type: 'posts/get',
      payload: superfetch('http://localhost:9001/api/v1/posts'),
      meta: {
        schema: arrayOf(postSchema)
      },
    });
  }
}

export function getPost(postId) {
  return (dispatch, getState) => {
    const currentState = getState().posts.ids.filter(id => +id === +postId);
    if (currentState.length) {
      return;
    }

    return dispatch({
      type: 'getPost',
      payload: superfetch('http://localhost:9001/api/v1/posts/' + postId),
      meta: {
        schema: postSchema
      },
    })
  }
}

export function updatePost(postId, payload) {
  return (dispatch, getState) => {
    // validate

    return dispatch({
      type: 'updatePost',
      payload: superfetch('http://localhost:9001/api/v1/posts/' + postId, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }),
      meta: {
        schema: postSchema
      },
    })
  }
}

export function createPost(payload) {
  return (dispatch, getState) => {
    // validate

    return dispatch({
      type: 'createPost',
      payload: superfetch('http://localhost:9001/api/v1/posts/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }),
      meta: {
        schema: postSchema
      },
    })
  }
}
