import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

import reducers from './modules/reducers';
import { thunk, promise } from '../../lib/middlewares';

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk, promise, createLogger()),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  ));

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./modules/reducers', () =>
      store.replaceReducer(require('./modules/reducers'))
    );
  }

  return store;
}
