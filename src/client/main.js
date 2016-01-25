import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import routes from './routes';
import DevTools from './redux/DevTools';

const store = configureStore();
store.dispatch({type: 'greet', name: 'jip'});
store.dispatch({type: 'greet', name: 'hazel'});
console.warn(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router routes={routes} history={browserHistory} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
)
