import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import routes from './routes';

const store = configureStore(window.__JSDATA__);
store.dispatch({type: 'greet', name: 'jip'});
store.dispatch({type: 'greet', name: 'hazel'});




// Render



// (1) normal render

// ReactDOM.render(
//   <Provider store={store}>
//     <Router routes={routes} history={browserHistory} />
//   </Provider>,
//   document.getElementById('app')
// )



// (2) use match

match({ routes, location }, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
  )
})

// Perf
if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
}
