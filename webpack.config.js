const path = require('path');
const config = require('./lib/config');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './assets/index'),
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  externals: [
    {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: config.devServerPort
  },
  // devtool: 'source-map'
};
