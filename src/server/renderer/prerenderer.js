import path from 'path';
import { readFileSync } from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { RoutingContext, match } from 'react-router';
import configureStore from '../../client/redux/configureStore';
import routes from '../../client/routes';
const markup = readFileSync(
  path.resolve(process.cwd(), 'src/server/renderer/prerender.html'),
  'utf-8'
);

// Every connected component.WrappedComponent get the hoisted static method/prop from wrapped component below it.
// Thx to react-redux using hosit package
const getFetchData = (component = {}) => component.fetchData;

export default class MainRenderer {
  constructor(options) {
    this.html = markup
      .replace('__CSS__', options.cssUrl)
      .replace('__VENDOR__', options.vendorUrl)
      .replace('__SCRIPT__', options.scriptUrl);
  }

  render(req, callback) {
    const store = configureStore();

    match({ routes, location: req.url }, async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        let redirectPath = redirectLocation.pathname + redirectLocation.search;
        if (redirectLocation.state && redirectLocation.state.intend) {
          redirectPath += '?intend=' + redirectLocation.state.intend;
        }
        callback(null, redirectPath, null);
        // res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        return;
      }

      if (error) {
        if (error.redirect) {
          callback(null, error.redirect, null);
          return;
        }

        callback({ message: error.stack }, null, null);
        return;
      }

      // prefetch & hydrate store
      const { params, location } = renderProps;

      const prefetchMethods = renderProps.components
        .filter((component) => getFetchData(component))
        .map(getFetchData);

      for (const prefetch of prefetchMethods) {
        if (!prefetch) continue;
        // await the promise
        await prefetch(store, params, location);
      }

      // all fetched data is done
      // render our components to string
      const __CONTENT__ = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps}/>
        </Provider>
      );

      // store state into variable
      const __DATA__ = store.getState();

      const page = this.html
        .replace('__DATA__', serialize(__DATA__))
        .replace('__CONTENT__', __CONTENT__);

      callback(null, null, page);
    });
  }
}
