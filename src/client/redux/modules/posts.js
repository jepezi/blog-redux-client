import superfetch from '../../../lib/superfetch';
import handleActions from '../../../lib/redux-actions/handleActions';

// posts reducer
export default handleActions({
  'posts/get': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    }
  },

}, {isLoading: false})

// action creators
export function getPosts() {
  return (dispatch, getState) => {
    const state = getState().posts;
    if (state.data) { return; }

    return dispatch({
      type: 'posts/get',
      payload: superfetch('http://localhost:9001/api/v1/posts'),
    });
  }
}
