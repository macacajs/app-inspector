'use strict';

const Router = require('koa-router');

const pgk = require('../package');
const render = require('./render');
const _ = require('./common/helper');

const rootRouter = new Router();

module.exports = function(app) {
  rootRouter
    .get('/', function * (next) {
      const isIOS = _.getDeviceInfo(this._options.udid).isIOS;

      if (global.serverStarted) {
        if (isIOS) {
          yield require('./ios').dumpXMLAndScreenShot();
        } else {
          yield require('./android').dumpXMLAndScreenShot();
        }
      }
      this.body = yield render('index.html', {
        data: {
          title: pgk.name,
          version: pgk.version,
          isIOS: isIOS,
          serverStarted: global.serverStarted
        }
      });
    });

  app
    .use(rootRouter.routes());
};
