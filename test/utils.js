'use strict';

const path = require('path');
const ADB = require('macaca-adb');
const Simulator = require('ios-simulator');
const child_process = require('child_process');

const pkg = require('../package');

const binFile = path.resolve(pkg.bin[pkg.name]);

const isIOS = process.env.PLATFORM === 'ios';
const startString = 'inspector start at:';

exports.getDevices = function *() {
  var matchedDevice = null;
  var devices;

  if (isIOS) {
    devices = yield Simulator.getDevices();
    devices.forEach(function(device) {
      if (device.name === 'iPhone 6' && device.available) {
        matchedDevice = device;
      }
    });
  } else {
    devices = yield ADB.getDevices();
    matchedDevice = devices[0];
  }
  return matchedDevice;
};

exports.getOutPut = function(udid) {
  console.log(`get simulator id: ${udid}`);
  return new Promise((resolve, reject) => {
    let res = '';
    const child = child_process.spawn(binFile, ['-u', udid, '-s']);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', data => {
      res += data;
      console.log(res);
      if (!!~res.indexOf(startString)) {
        resolve(res);
      }
    });
  });
};

