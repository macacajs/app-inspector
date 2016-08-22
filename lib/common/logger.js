'use strict';

const logger = require('xlogger');

const options = {
  logToStd: true,
  closeFile: true
};

module.exports = logger.Logger(options);
module.exports.middleware = logger.middleware(options);
