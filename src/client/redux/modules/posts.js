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

}, initialState)

// action creators
export function getPosts() {
  return (dispatch, getState) => {
    const currentState = getState().posts.ids;
    // more than 2 means we have already loaded all posts
    // 1 means we visit PostRoute first
    if (currentState.length > 2) { return; }

    return dispatch({
      type: 'posts/get',
      payload: superfetch('http://localhost:9001/api/v1/posts'),
      meta: {
        schema: arrayOf(postSchema)
      },
    });
  }
}
