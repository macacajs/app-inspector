'use strict';

const config = require('./config');

module.exports = function(app) {
  if (!config.isDev) {
    return;
  }

  const webpack = require('webpack');

  const webpackConfig = require('../webpack.config');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');

  app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath
  }));
};
