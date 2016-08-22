'use strict';

const Router = require('koa-router');

const renderer = require('./render');

const rootRouter = new Router();
const pgk = require('../package');
const _ = require('./common/helper');

module.exports = function(app) {
 rootRouter
    .get('/', function *(next) {
      const isIOS = _.getDeviceInfo(this._options.udid).isIOS;

      if (global.serverStarted) {
        if (isIOS) {
          yield require('./ios').dumpXMLAndScreenShot();
        } else {
          yield require('./android').dumpXMLAndScreenShot();
        }
      }
      this.body = renderer('home', {
        page: {
          title: pgk.name
        },
        data: {
          isIOS: isIOS,
          serverStarted: global.serverStarted
        }
      });
      yield next;
    });

  app
    .use(rootRouter.routes());
};
