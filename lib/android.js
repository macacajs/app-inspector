'use strict';

const fs = require('fs');
const path = require('path');
const ADB = require('macaca-adb');
const xml2map = require('xml2map');
const UIAutomator = require('uiautomator-client');

const _ = require('./common/helper');
const logger = require('./common/logger');

var adb;
var uiautomator;

exports.dumpXMLAndScreenShot = function *() {
  yield uiautomator.send({
    cmd: 'getSource',
    args: {
    }
  });

  const tmpDir = adb.getTmpDir();
  const xmlData = yield adb.shell(`cat ${tmpDir}/macaca-dump.xml`);
  const xmlHackData = yield adb.shell(`cat ${tmpDir}/local/tmp/macaca-dump.xml`);
  var xml = xmlData.length > xmlHackData.length ? xmlData : xmlHackData;
  xml = xml.replace(/content-desc=\"\"/g, 'content-desc="null"');
  const tempDir = path.join(__dirname, '..', '.temp');
  _.mkdir(tempDir);
  const xmlFilePath = path.join(tempDir, 'android.json');
  const hierarchy = xml2map.tojson(xml).hierarchy;

  logger.info(`Dump Android XML success, save to ${xmlFilePath}`);

  const adaptor = function(node) {
    const bounds = node.bounds.match(/[\d\.]+/g);
    node.rawtext = node.text;

    // [ x, y, width, height]
    node.bounds = [
      ~~bounds[0],
      ~~bounds[1],
      bounds[2] - bounds[0],
      bounds[3] - bounds[1],
    ];

    if (node.node) {
      node.nodes = node.node.length ? node.node : [node.node];
      node.nodes.forEach(adaptor);

      delete node.node;
    }
    return node;
  };

  var data = adaptor(hierarchy.node);
  fs.writeFileSync(xmlFilePath, JSON.stringify(data), 'utf8');
  const remoteFile = `${tmpDir}/screenshot.png`;
  const cmd = `/system/bin/rm ${remoteFile}; /system/bin/screencap -p ${remoteFile}`;
  yield adb.shell(cmd);
  const localPath = path.join(tempDir, 'android-screenshot.png');
  yield adb.pull(remoteFile, localPath);
};

exports.initDevice = function *(udid) {
  adb = new ADB();
  adb.setDeviceId(udid);
  uiautomator = new UIAutomator();
  yield uiautomator.init(adb);

  logger.info(`Android device started: ${udid}`);
};
