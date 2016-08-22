'use strict';

require('babel/register')({
  extensions: ['.jsx'],
  ignore: false
});

const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const current = path.join(__dirname, '..', 'views');

module.exports = function(template, data) {
  const file = path.join(current, template, 'index');
  let html;

  try {
    const Component = require(file);
    var temp = ReactDOMServer.renderToStaticMarkup(React.createFactory(Component)(data));
    html = `<!DOCTYPE html>${temp}`;
  } catch (e) {
    console.log(e.stack);
    html = 'render template:' + template + ' failed';
  }
  return html;
};
