'use strict';

const path = require('path');
const webpack = require('webpack');
const traceFragment = require('macaca-ecosystem/lib/trace-fragment');

const pkg = require('./package');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './assets/index')
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  externals: [
    {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version),
      'process.env.traceFragment': traceFragment
    })
  ]
};
