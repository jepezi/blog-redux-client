import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules/reducers';

import { thunk, promise, logger } from '../../lib/middlewares';
import DevTools from './DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunk, promise, logger),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducers, initialState);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./modules/reducers', () =>
      store.replaceReducer(require('./modules/reducers'))
    );
  }

  return store;
}
