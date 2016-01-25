var path = require('path');
var webpack = require('webpack');
var APPPATH = path.resolve(__dirname, '..');

var entry = [
  'webpack-hot-middleware/client',
  path.join(APPPATH, 'src/client/main.js')
];
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
      presets: ['es2015', 'react', 'stage-2'],
      plugins: ['add-module-exports'],
      // plugins: ['transform-runtime']
      env: {
        development: {
          plugins: [
            ["react-transform", {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }]
          ]
        }
      }
    }
  },
  { test: /.module.s?css$/, loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap&' +
      'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../src/')) + 'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../srcAdmin/')) },
  { test: /^((?!.module).)*css$/, loader: 'style!css!postcss!sass?outputStyle=expanded&sourceMap&' +
      'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../src/')) + 'includePaths[]=' + encodeURIComponent(path.resolve(__dirname, '../srcAdmin/')) },
];

var externals = {};
// var externals = { react: "React", ['react-dom']: "ReactDOM" };
// ProvidePlugin: Make modules available as free variables inside modules
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
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
  postcss: function(webpack) {
    return [
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
    ]
  },
};
