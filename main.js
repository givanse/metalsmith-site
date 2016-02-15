require('babel-polyfill');
require('babel-register')({
  'presets': [
    'es2015',
    'stage-1',
  ]
});
require('./build')
