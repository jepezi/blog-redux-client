import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules/reducers';

import { thunk, promise } from '../../lib/middlewares';

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk, promise),
  ));

  return store;
}
