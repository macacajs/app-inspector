/* ================================================================
 * app-inspector by xdf(xudafeng[at]126.com)
 *
 * first created at : Wed Jul 27 2016 10:57:58 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */
'use strict';

const Router = require('koa-router');

const IOS = require('./ios');
const Android = require('./android');
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
          yield IOS.dumpXMLAndScreenShot();
        } else {
          yield Android.dumpXMLAndScreenShot();
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
