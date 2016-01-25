import React from 'react';

import App from './containers/App';
import Home from './containers/Home';

const CommentsRoute = {
  path: 'comments',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Comments'));
    });
  }
}

const PostNewRoute = {
  path: 'posts/new',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/PostForm'));
    });
  }
}

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
const NotFoundComponent = () => <div>Oops! Not found admin route</div>
const NotFound = {
  path: '*',
  component: NotFoundComponent
}

const routes = {
  path: '/',
  component: App,
  indexRoute: {component: Home},
  childRoutes: [PostsRoute, PostNewRoute, PostRoute, CommentsRoute, NotFound]
}

export default routes;
