import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import routes from './routes';

const store = configureStore(window.__JSDATA__);
store.dispatch({type: 'greet', name: 'jip'});
store.dispatch({type: 'greet', name: 'hazel'});

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
)
