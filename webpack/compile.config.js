var path = require('path');
var Clean = require('clean-webpack-plugin');
var APPPATH = path.resolve(__dirname, '..');

var entry = path.join(APPPATH, 'src/client/main.js');
var output = {
  path: path.join(APPPATH, 'public', 'dist'),
  filename: '[name].js',
  publicPath: '/dist/',
  chunkFilename: '[id].chunk.js'
};
var loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'react'/*, 'stage-2'*/],
      plugins: ['add-module-exports'],
      // plugins: ['transform-runtime']
    }
  }
];

var externals = {};
// var externals = { react: "React", ['react-dom']: "ReactDOM" };
// ProvidePlugin: Make modules available as free variables inside modules
var plugins = [
  new Clean(['../public/dist']),
];

// export webpack config object.
module.exports = {
  entry: entry,
  output: output,
  module: {
    loaders: loaders
  },
  externals: externals,
  plugins: plugins,
};
