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

const os = require('os');
const path = require('path');
const serve = require('koa-static');
const router = require('koa-router');

const pkg = require('../package');
const logger = require('./common/logger');

module.exports = app => {
  const string = `${pkg.name}/${pkg.version} node/${process.version}(${os.platform()})`;

  app.use(function *powerby(next) {
    yield next;
    this.set('X-Powered-By', string);
  });

  const p = path.join(__dirname, '..', 'public');
  app.use(serve(p));
  app.use(serve(path.join(p, '3rdparty')));
  app.use(serve(path.join(path.resolve(p, '..', '.temp'))));
  router(app);

  app.use(logger.middleware);
};
