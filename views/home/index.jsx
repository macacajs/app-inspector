'use strict';

const React = require('react');

const Layout = require('../common/layout');

class Home extends React.Component {

  render() {
    return (
      <Layout {...this.props}>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-4">
              <div className="screenshot">
                <div id="image"></div>
                <canvas id="mask"></canvas>
              </div>
            </div>
            <div id="tree" className="col-xs-6 col-md-4"></div>
            <div id="info" className="col-xs-6 col-md-4"></div>
          </div>
        </div>
        <input id="isIOS" type="hidden" value={this.props.data.isIOS} />
        <input id="serverStarted" type="hidden" value={this.props.data.serverStarted} />
      </Layout>
    );
  }
}

module.exports = Home;
