// Added for ES6 usage demonstration in devServerAdmin
//
// Polyfill for async await
require('babel-polyfill');
// Babel require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-2'],
  plugins: ['add-module-exports', 'transform-runtime'],
  compact: false,
});

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('../src/server/server.js');
