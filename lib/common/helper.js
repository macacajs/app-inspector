'use strict';

const utils = require('xutil');
const request = require('request');
const childProcess = require('child_process');

const logger = require('./logger');

var _ = utils.merge({}, utils);

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  return new Promise((resolve, reject) => {
    var stdout = '';
    var stderr = '';
    var child = childProcess.spawn.apply(childProcess, args);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

    child.on('error', error => {
      reject(error);
    });

    child.stdout.on('data', data => {
      stdout += data;
    });

    child.stderr.on('data', data => {
      stderr += data;
    });

    child.on('close', code => {
      var error;
      if (code) {
        error = new Error(stderr);
        error.code = code;
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
};

_.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

_.retry = function(func, interval, num) {
  return new Promise((resolve, reject) => {
    func().then(resolve, err => {
      if (num > 0 || typeof num === 'undefined') {
        _.sleep(interval).then(() => {
          resolve(_.retry(func, interval, num - 1));
        });
      } else {
        reject(err);
      }
    });
  });
};

_.request = function(url, method, body) {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase();

    const reqOpts = {
      url: url,
      method: method,
      headers: {
        'Content-type': 'application/json;charset=UTF=8'
      },
      resolveWithFullResponse: true
    };

    request(reqOpts, (error, res, body) => {
      if (error) {
        logger.debug(`xctest client proxy error with: ${error}`);
        return reject(error);
      }

      resolve(body);
    });
  });
};

_.getDeviceInfo = function(udid) {
  return {
    isIOS: udid.length === 36 || udid.length === 40,
    isRealIOS: udid.length === 40 && !udid.includes('-')
  };
};

/**
 * print error information for wrong node
 * @param {string} source
 */
_.reportNodesError = function(source) {
  console.error(_.chalk.red(
    `The source may be wrong, please check your app or report with below message at:
    ${_.chalk.blue('https://github.com/macacajs/app-inspector/issues/new')}
    ****** SOURCE START *******
    ${source}
    '****** SOURCE END *******`
  ));
};

module.exports = _;
