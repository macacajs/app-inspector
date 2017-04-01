'use strict';

var ADB = require('macaca-adb');

exports.getDevices = function *() {
  var adb = new ADB();
  var devices = yield ADB.getDevices();
  var device = devices[0];
  return device;
};
