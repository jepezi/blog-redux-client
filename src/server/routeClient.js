import path from 'path';
import fs from 'fs';
import express from 'express';

/**
 * Check if there is user in session
 */
function authFilter(req, res, next) {
  if (!req.session.user) {
    // need return here
    return res.redirect('/admin/login');
  }

  next();
}

/**
 * Redirect if already authed
 */
function guestFilter(req, res, next) {
  if (req.session.user) {
    // need return here
    return res.redirect('/admin');
  }

  next();
}




// client mini-app
const client = express.Router();




// Catch-all

const stat = {
  publicPath: 'http://localhost:3001/dist/',
  assetsByChunkName: {
    main: 'main.js'
  }
};

const RendererClass = __DEVELOPMENT__
  ? require('./renderer/simplerenderer.js')('client.html')
  : require('../../public/dist/prerenderer/main.js');

const clientStat = __DEVELOPMENT__
  ? stat
  : require('../../public/dist/webpack-stats.json');

const renderer = new RendererClass({
  cssUrl: clientStat.publicPath + [].concat(clientStat.assetsByChunkName.main)[1],
  scriptUrl: clientStat.publicPath + [].concat(clientStat.assetsByChunkName.main)[0],
  vendorUrl: clientStat.publicPath + [].concat(clientStat.assetsByChunkName.vendor)[0],
});

export default function renderClient(req, res) {
  renderer.render(req, function renderApp(err, redirect, html) {
    if (err) {
      res.statusCode = 500;
      res.contentType = 'text; charset=utf8';
      res.end(err.message);
      return;
    }
    if (redirect) {
      res.redirect(301, redirect);
      return;
    }

    res.contentType = 'text/html; charset=utf8';
    res.end(html);
  });
};
