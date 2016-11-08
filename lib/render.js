'use strict';

const path = require('path');
const nunjucks = require('nunjucks');

const config = require('./config');

const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.resolve(__dirname, '../views'), {
    noCache: config.isDev
  })
);

env.addFilter('jstring', str =>
  str
    .replace(/["'\/]/g, char => '\\' + char)
    .replace(/\n/g, char => '\\\n')
);

module.exports = function render(path, data) {
  return new Promise((resolve, reject) => {
    env.render(path, data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
