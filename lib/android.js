'use strict';

const fs = require('fs');
const path = require('path');
const ADB = require('macaca-adb');
const xml2map = require('xml2map');
const UIAutomatorWD = require('uiautomatorwd');

const _ = require('./common/helper');
const logger = require('./common/logger');

var adb;
var uiautomator;

exports.dumpXMLAndScreenShot = function * () {
  yield adb.shell(`touch ${ADB.ANDROID_TMP_DIR}/macaca-dump.xml`);
  var result = yield uiautomator.sendCommand('/wd/hub/session/:sessionId/source', 'get', null);
  var xml = result.value;
  xml = xml.replace(/content-desc=\"\"/g, 'content-desc="null"');
  const tempDir = path.join(__dirname, '..', '.temp');
  _.mkdir(tempDir);
  const xmlFilePath = path.join(tempDir, 'android.json');
  const {
    hierarchy
  } = xml2map.tojson(xml);

  const adaptor = function(node) {
    if (node.bounds) {
      const bounds = node.bounds.match(/[\d\.]+/g);

      // [ x, y, width, height]
      node.bounds = [
        ~~bounds[0],
        ~~bounds[1],
        bounds[2] - bounds[0],
        bounds[3] - bounds[1]
      ];
    }

    if (node.node) {
      node.nodes = node.node.length ? node.node : [node.node];
      node.nodes.forEach(adaptor);
      delete node.node;
    }
    return node;
  };

  const matchedNode = _.findLast(hierarchy.node, i => {
    return (
      i !== null &&
      typeof i === 'object' &&
      i.package !== 'com.android.systemui'
    );
  });

  let data;

  try {
    data = adaptor(matchedNode);
  } finally {
    !data && _.reportNodesError(xml);
  }

  fs.writeFileSync(xmlFilePath, JSON.stringify(data), 'utf8');
  logger.info(`Dump Android XML success, save to ${xmlFilePath}`);

  const remoteFile = `${ADB.ANDROID_TMP_DIR}/screenshot.png`;
  const cmd = `/system/bin/rm ${remoteFile}; /system/bin/screencap -p ${remoteFile}`;
  yield adb.shell(cmd);
  const localPath = path.join(tempDir, 'android-screenshot.png');
  yield adb.pull(remoteFile, localPath);
};

exports.initDevice = function * (udid) {
  adb = new ADB();
  adb.setDeviceId(udid);
  uiautomator = new UIAutomatorWD();
  yield uiautomator.init(adb);
  logger.info(`Android device started: ${udid}`);
};
