'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const XCTest = require('xctest-client');
const Simulator = require('ios-simulator');

const _ = require('./common/helper');
const logger = require('./common/logger');

function reportNodesError(source) {
  return chalk.red(
    `The source may be wrong, please report with below message at:
    ${chalk.blue('https://github.com/macacajs/app-inspector/issues/new')}
    ****** xctest source start *******
    ${JSON.stringify(JSON.parse(source))}
    '****** xctest source end *******`
  );
}

const adaptor = function(node) {
  node.class = node.type;

  const rect = node.rect;
  node.bounds = [
    rect.x,
    rect.y,
    rect.width,
    rect.height,
  ];

  if (node.children) {
    const children = node.children.length ? node.children : [node.children];

    var nodes = [];
    children.forEach(child => {
      if (parseInt(child.isVisible, 10) || child.type !== 'Window') {
        nodes.push(adaptor(child));
      }
    });

    node.nodes = nodes;
    delete node.children;
  }
  return node;
};

var xctest;

exports.dumpXMLAndScreenShot = function *() {
  const source = yield _.request(`http://${xctest.proxyHost}:${xctest.proxyPort}/source?format=json`, 'get', {});
  const tree = JSON.parse(source).value.tree;
  const tempDir = path.join(__dirname, '..', '.temp');
  _.mkdir(tempDir);
  const xmlFilePath = path.join(tempDir, 'ios.json');

  let compatibleTree;
  try {
    compatibleTree = adaptor(tree);
  } catch(e) {
    console.error(reportNodesError(source));
    throw e;
  }

  fs.writeFileSync(xmlFilePath, JSON.stringify(compatibleTree), 'utf8');
  logger.debug(`Dump iOS XML success, save to ${xmlFilePath}`);

  const screenshot = yield _.request(`http://${xctest.proxyHost}:${xctest.proxyPort}/screenshot`, 'get', {});
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

  xctest = new XCTest({
    device: device
  });

  yield xctest.start({
    desiredCapabilities: {}
  });

  if (isRealIOS) {
    yield _.sleep(15 * 1000);
  }

  logger.info(`iOS device started: ${udid}`);
};
