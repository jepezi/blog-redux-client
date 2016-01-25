/*
  1) Customize history for react-router to use basename
    [A] - import `useRouterHistory` from `react-router`
    [B] - import createBrowserHistory from `history`
    [C] - create customized appHistory and give it to <Router />

  2) Initial state for user data (coming from server)
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, useRouterHistory } from 'react-router'; // [A]
import createHistory from 'history/lib/createBrowserHistory'; // [B]
const appHistory = useRouterHistory(createHistory)({ basename: '/admin' }); // [C]
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import routes from './routes';
import DevTools from './redux/DevTools';

const store = configureStore();

// [2] normalize user
import { Schema, normalize } from 'normalizr';
const userSchema = new Schema('user');
const response = normalize(window.__JSDATA__, userSchema);
store.dispatch({ type: 'user/load', payload: response });

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router routes={routes} history={appHistory} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
)
