'use strict';

const React = require('react');

const pkg = require('../../package');

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="text-center">
          &copy;{new Date().getFullYear()}&nbsp;<a href={pkg.homepage} target="_blank">{pkg.name}</a>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;
