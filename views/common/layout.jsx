'use strict';

const React = require('react');
const Meta = require('./meta');
const Header = require('./header');
const Footer = require('./footer');

class Layout extends React.Component {
  render() {
    var datas = this.props.datas;
    return (
      <html>
        <Meta {...this.props}/>
        <body>
          <Header {...this.props}/>
          <div id="content">
            {this.props.children}
          </div>
          <Footer {...this.props}/>
          <script src="/javascript/index.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Layout;
