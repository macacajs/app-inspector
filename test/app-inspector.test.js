'use strict';

const path = require('path');
const EOL = require('os').EOL;
const CliTest = require('command-line-test');

const pkg = require('../package');

const binFile = path.resolve(pkg.bin[pkg.name]);

describe('command-line test', function() {

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

});
