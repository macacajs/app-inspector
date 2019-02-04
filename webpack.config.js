'use strict';

const path = require('path');

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
  }
};
