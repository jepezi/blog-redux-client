import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';

// const routes = (
//   <Route path="/" component={App}>
//     <IndexRoute component={Home} />
//     <Route path="posts/:id" component={Post} />
//   </Route>
// );

const PostRoute = {
  path: 'posts/:id',
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./containers/Post'))
    });
  }
}

const PostsRoute = {
  path: 'posts',
  getComponent: (location, cb) => {
    require.ensure([], require => {
      cb(null, require('./containers/Posts'))
    });
  }
}

// NotFound
const NotFoundComponent = () => <div>Oops! Not found route</div>
const NotFound = {
  path: '*',
  component: NotFoundComponent
}

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: Home},
  childRoutes: [PostRoute, PostsRoute, NotFound]
}

export default routes;
