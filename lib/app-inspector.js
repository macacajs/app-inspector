'use strict';

const chalk = require('chalk');
const detect = require('detect-port');

const Server = require('./server');
const _ = require('./common/helper');
const logger = require('./common/logger');

function *parseOptions(options) {
  var port = yield detect(options.port);

  if (port !== options.port) {
    logger.info('port: %d was occupied, changed port: %d', options.port, port);
    options.port = port;
  }
}

function *initDevice(options) {
  const udid = options.udid;
  const isIOS = _.getDeviceInfo(udid).isIOS;

  if (isIOS) {
    yield require('./ios').initDevice(udid);
  } else {
    yield require('./android').initDevice(udid);
  }
}

module.exports = function *(options) {
  const server = new Server(options);
  yield server.start();
  const url = `http://${_.ipv4}:${options.port}`;
  logger.info(`inspector start at: ${chalk.white(url)}`);
  yield initDevice(options);
  global.serverStarted = true;
};
