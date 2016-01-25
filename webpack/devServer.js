const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devPort = 3001;

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

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

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
