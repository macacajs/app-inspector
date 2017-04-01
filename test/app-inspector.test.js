'use strict';

const path = require('path');
const EOL = require('os').EOL;
const CliTest = require('command-line-test');
const child_process = require('child_process');

const utils = require('./utils');
const pkg = require('../package');

const binFile = path.resolve(pkg.bin[pkg.name]);

const androidStartString = 'inspector start at:';

const getOutPut = function(udid) {
  return new Promise((resolve, reject) => {
    let res = '';
    const child = child_process.spawn(binFile, ['-u', udid, '-s']);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', data => {
      console.log(data);
      res += data;
      if (!!~res.indexOf(androidStartString)) {
        resolve(res);
      }
    });
  });
};
describe('command line test', function() {

  it('`app-inspector -v` should be ok', function *() {
    var cliTest = new CliTest();
    var res = yield cliTest.execFile(binFile, ['-v'], {});
    res.stdout.should.containEql(pkg.version);
  });

  it('`app-inspector -h` should be ok', function *() {
    var cliTest = new CliTest();
    var res = yield cliTest.execFile(binFile, ['-h'], {});
    var lines = res.stdout.trim().split(EOL);
    lines[0].should.containEql(pkg.name);
  });

  it('app-inspector -u should be ok', function *() {
    var device = yield utils.getDevices();
    var res = yield getOutPut(device.udid);
    res.should.containEql(androidStartString);
  });
});
