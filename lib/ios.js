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

const fs = require('fs');
const path = require('path');
const logger = require('./common/logger');
const XCTest = require('xctest-client');
const Simulator = require('ios-simulator');

const _ = require('./common/helper');

const adaptor = function(node) {
  const bounds = node.bounds.match(/[\d\.]+/g);
  node.text = `${node.type} x:${bounds[0]},y:${bounds[1]} x:${parseInt(bounds[2], 10) + parseInt(bounds[0], 10)},y:${parseInt(bounds[3], 10) + parseInt(bounds[1], 10)}`;

  if (node.children) {
    node.bounds = `[${bounds[0]},${bounds[1]}][${parseInt(bounds[2], 10) + parseInt(bounds[0], 10)},${parseInt(bounds[3], 10) + parseInt(bounds[1], 10)}]`;
    node.nodes = node.children.length ? node.children : [node.children];
    node.state = {
      expanded: true
    };
    delete node.children;

    var nodes = [];

    for (var i = 0; i < node.nodes.length; i++) {
      var child = node.nodes[i];
      if (parseInt(child.isVisible, 10) || child.type !== 'Window') {
        nodes.push(adaptor(child));
      }
    }
    node.nodes = nodes;
  }
  return node;
};

const wdaHost = _.ipv4;
const wdaPort = 8200;

exports.dumpXMLAndScreenShot = function *() {
  const source = yield _.request(`http://${wdaHost}:${wdaPort}/source`, 'get', {});
  const tree = JSON.parse(source).value.tree;
  const tempDir = path.join(__dirname, '..', '.temp');
  _.mkdir(tempDir);
  const xmlFilePath = path.join(tempDir, 'ios.json');

  logger.info(`Dump iOS XML success, save to ${xmlFilePath}`);
  fs.writeFileSync(xmlFilePath, JSON.stringify(adaptor(tree)), 'utf8');

  const screenshot = yield _.request(`http://${wdaHost}:${wdaPort}/screenshot`, 'get', {});
  const base64Data = JSON.parse(screenshot).value;
  const imgFilePath = path.join(tempDir, 'ios-screenshot.png');
  fs.writeFileSync(imgFilePath, base64Data, 'base64');
};

exports.initDevice = function *(udid) {
  const isRealIOS = _.getDeviceInfo(udid).isRealIOS;

  var device;

  if (isRealIOS) {
    device = {
      deviceId: udid
    };
  } else {
    device = new Simulator({
      deviceId: udid
    });
  }

  const xctest = new XCTest({
    device: device,
    proxyPort: wdaPort
  });
  yield xctest.start({
    desiredCapabilities: {}
  });

  if (isRealIOS) {
    yield _.sleep(10000);
  }

  logger.info(`iOS device started: ${udid}`);
};
