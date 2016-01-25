// Added for ES6 usage demonstration in devServerAdmin
//
// Polyfill for async await
require('babel-polyfill');
// Babel require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-2'],
  plugins: ['add-module-exports']
});

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devPort = 3001;
// Login
var bodyParser = require('body-parser');
var session = require('express-session');

const webpackConfig = require('./hot.config');
const compiler = webpack(webpackConfig);

const serverOptions = {
  noInfo: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  // watchOptions: { aggregateTimeout: 2000, poll: 1000 },
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = express();
// Login
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'shuuuuu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000*60 }
}));

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

// Admin Router
app.use('/admin', require('./devServerAdmin'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.listen(devPort, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', devPort);
  }
});
