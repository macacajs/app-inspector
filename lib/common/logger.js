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

const logger = require('xlogger');

const options = {
  logToStd: true,
  closeFile: true
};

module.exports = logger.Logger(options);
module.exports.middleware = logger.middleware(options);
