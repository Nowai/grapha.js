var webpack = require('webpack');
var path = require('path');

// dev & production builds
const env = process.env.WEBPACK_ENV;

// library meta-data
var libName = 'grapha';
var outputFileName = env === 'build' ? libName + '.min.js' : libName + '.js';



var config = {
  entry: './src/index.js',
  devtool: env === 'dev' ? 'eval-source-map' : false,
  output: {
    path: __dirname + '/lib',
    filename: outputFileName,
    library: libName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2']
        },
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        loader: 'eslint-loader',
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
      './src'
    ],
    extensions: ['.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: env === 'build'
    })
  ]
};

module.exports = config;
