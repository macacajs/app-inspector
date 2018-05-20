'use strict';

const {
  EOL,
} = require('os');
const path = require('path');
const assert = require('assert');
const CliTest = require('command-line-test');

const utils = require('./utils');
const pkg = require('../package');

const binFile = path.resolve(pkg.bin[pkg.name]);

const startString = 'inspector start at:';

describe('command line test', function() {
  this.timeout(60 * 10 * 1000);

  it('`app-inspector -v` should be ok', function *() {
    var cliTest = new CliTest();
    var res = yield cliTest.execFile(binFile, ['-v'], {});
    assert.ok(res.stdout.includes(pkg.version));
  });

  it('`app-inspector -h` should be ok', function *() {
    var cliTest = new CliTest();
    var res = yield cliTest.execFile(binFile, ['-h'], {});
    var lines = res.stdout.trim().split(EOL);
    assert.ok(lines[0].includes(pkg.name));
  });

  it('app-inspector start should be ok', function *() {
    var device = yield utils.getDevices();
    var res = yield utils.getOutPut(device.udid);
    assert.ok(res.includes(startString));
  });
});
