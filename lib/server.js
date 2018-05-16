'use strict';

const os = require('os');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./router');
const _ = require('./common/helper');
const logger = require('./common/logger');
const middlewares = require('./middlewares');
const webpackMiddleware = require('./webpack-dev-middleware');

const startServer = (options) => {

  return new Promise((resolve, reject) => {
    logger.debug('server start with config:\n %j', options);

    try {
      const app = koa();

      app.use(bodyParser());

      app.use(function * (next) {
        this._options = options;
        yield next;
      });

      webpackMiddleware(app);

      middlewares(app);

      router(app);

      app.listen(options.port, resolve);
    } catch (e) {
      logger.debug(`server failed to start: ${e.stack}`);
      reject(e);
    }
  });
};

var defaultOpt = {};

function Server(options) {
  this.options = _.merge(defaultOpt, options || {});
  this.init();
}

Server.prototype.init = function() {
  this.options.ip = _.ipv4;
  this.options.host = os.hostname();
  this.options.loaded_time = _.moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
};

Server.prototype.start = function() {
  return startServer(this.options);
};

module.exports = Server;
