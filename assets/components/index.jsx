import React, { Component } from 'react';
import Screen from './screen';
import Tree from './tree';
import Info from './info';
import AppInfo from './app-info';
import { getNodePathByXY } from '../libs/bounds';
import getXPath from '../libs/xpath';

const { appData } = window;

class App extends Component {

  constructor() {
    super();

    this.state = {
      node: null,
      tree: null,
      XPath: null,
      focusBounds: null,
      treeViewPortWidth: null,
      isIOS: appData.isIOS,
      serverStarted: appData.serverStarted
    };

    window.addEventListener('resize', () => this.resizeTreeViewport());
  }

  componentDidMount() {
    if (this.state.serverStarted) {
      fetch(this.state.isIOS ? './ios.json' : './android.json')
        .then(res => res.json())
        .then(tree => {
          this.setState({ tree });
        });
    } else {
      setTimeout(() => location.reload(), 3000);
    }
  }

  handleTreeSelect(node, nodePath) {
    const { tree, isIOS } = this.state;

    this.setState({
      node,
      focusBounds: node.bounds,
      XPath: getXPath(tree, nodePath, isIOS),
    });
    this.resizeTreeViewport();
  }

  handleMouseEnter(node) {
    this.setState({
      focusBounds: node.bounds
    });
  }

  handleMouseLeave(node) {
    this.setState({
      focusBounds: null
    });
  }

  handleCanvasClick(x, y) {
    const nodePath = getNodePathByXY(this.state.tree, this.state.isIOS, x, y);
    if (!nodePath) return;
    this.refs.tree.focus(nodePath);
    this.resizeTreeViewport();
  }

  resizeTreeViewport() {
    setTimeout(() => {
      this.refs.treeScroller && this.setState({
        treeViewPortWidth: this.refs.treeScroller.scrollWidth
      });
    });
  }

  render() {
    return (
      <div className="container">
        {
          this.state.tree ? (
            <div className="main">
              <div className="flex-col">
                <Screen
                  frame={this.state.focusBounds}
                  onClick={this.handleCanvasClick.bind(this)}
                  isIOS={this.state.isIOS}
                  src={ this.state.isIOS ? '/ios-screenshot.png' : '/android-screenshot.png' }
                />
              </div>
              <div className="flex-col" ref="treeScroller">
                <Tree
                  ref="tree"
                  width={this.state.treeViewPortWidth}
                  onSelect={this.handleTreeSelect.bind(this)}
                  onNodeMouseEnter={this.handleMouseEnter.bind(this)}
                  onNodeMouseLeave={this.handleMouseLeave.bind(this)}
                  initialData={this.state.tree}
                />
              </div>
              { this.state.node ? (
                <div className="flex-col">
                  <Info node={this.state.node} XPath={this.state.XPath}/>
                </div>
              ) : null }
            </div>
          ) : (
            <div className="loading">Waiting Device start...</div>
          )
        }
        <AppInfo/>
      </div>
    );
  }
}

module.exports = App;
