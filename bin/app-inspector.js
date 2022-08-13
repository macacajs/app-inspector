#!/usr/bin/env node

'use strict';

const co = require('co');
const program = require('commander');
const update = require('npm-update');

const pkg = require('../package.json');
const _ = require('../lib/common/helper');

const {
  chalk,
} = _;

const Inspector = require('..');

const options = {
  port: 5678,
  verbose: true,
};
const EOL = require('os').EOL;

program
  .option('-p, --port <d>', 'port to use (5678 default)')
  .option('-u, --udid <s>', 'udid of device')
  .option('-s, --silent', 'start without opening browser')
  .option('--verbose', 'show more debugging information')
  .option('-v, --versions', 'output version infomation')
  .usage('');

program.parse(process.argv);

const printInfo = function(lines) {
  let maxLength = 0;
  lines.forEach(line => {
    maxLength = line.length > maxLength ? line.length : maxLength;
  });

  const res = [ new Array(maxLength + 7).join('*') ];

  lines.forEach(line => {
    res.push(`*  ${line + new Array(maxLength - line.length + 1).join(' ')}  *`);
  });

  res.push(new Array(maxLength + 7).join('*'));
  console.log(chalk.white(`${EOL}${res.join(EOL)}${EOL}`));
};

// eslint-disable-next-line handle-callback-err
function init(error, data) {
  if (data && data.version && pkg.version !== data.version) {
    printInfo([ `version ${pkg.version} is outdate`, `run: npm i -g ${pkg.name}@${data.version}` ]);
  }

  if (program.versions) {
    console.info(`${EOL} ${chalk.grey(pkg.version)} ${EOL}`);
    process.exit(0);
  }

  if (!program.udid) {
    program.help();
    process.exit(0);
  }

  _.merge(options, _.getConfig(program));

  co(Inspector, options).catch(e => {
    console.log(e);
  });
}

co(update, {
  pkg,
  callback: init,
});
