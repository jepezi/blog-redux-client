import superfetch from '../../../lib/superfetch';
import handleActions from '../../../lib/redux-actions/handleActions';
import union from 'lodash/union';

/**
 * Schema
 */
import { Schema, arrayOf } from 'normalizr';
const postSchema = new Schema('posts');
const commentSchema = new Schema('comments');

commentSchema.define({
  post: postSchema,
});

const initialState = {
  isLoading: false,
  ids: []
};

// reducer
export default handleActions({
  'comments/get': {
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
      }
    }
  },
}, initialState);

// action creators
export function getComments() {
  return (dispatch, getState) => {
    const currentState = getState().comments.ids;
    if (currentState.length > 2) {
      return;
    }
    dispatch({type: 'clear_error'});

    return dispatch({
      type: 'comments/get',
      payload: superfetch('http://localhost:9001/api/v1/comments'),
      meta: {
        schema: arrayOf(commentSchema)
      },
    })
  }
}
