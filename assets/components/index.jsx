import React, { Component } from 'react';
import GitHubButton from 'react-github-button';

import 'react-github-button/assets/style.css';

import Tree from './tree';
import Info from './info';
import Screen from './screen';
import AppInfo from './app-info';
import {
  getXPath,
  getXPathLite
} from '../libs/xpath';
import { getNodePathByXY } from '../libs/bounds';

const { appData } = window;

class App extends Component {

  constructor() {
    super();

    this.state = {
      node: null,
      tree: null,
      xpath_lite: null,
      xpath: null,
      focusBounds: null,
      treeViewPortWidth: null,
      isIOS: appData.isIOS,
      serverStarted: appData.serverStarted,
      timer: 0,
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleTreeSelect(node, nodePath) {
    const { tree, isIOS } = this.state;

    this.setState({
      node,
      focusBounds: node.bounds,
      xpath_lite: getXPathLite(tree, nodePath),
      xpath: getXPath(tree, nodePath)
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
    this.updateTreeScrollerStyle();
  }

  resizeTreeViewport() {
    setTimeout(() => {
      this.refs.treeScroller && this.setState({
        treeViewPortWidth: this.refs.treeScroller.scrollWidth
      });
    });
  }

  updateTreeScrollerStyle() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const scrollTop = document.querySelectorAll('.tree-selected')[0].offsetTop;
      const scrollLeft = document.querySelectorAll('.tree-selected .tree-indent')[0].offsetWidth;
      this.refs.treeScroller.scrollTo({
        left: scrollLeft - 80,
        top: scrollTop - 100,
        behavior: "smooth"
      });
    })
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <a href="//macacajs.github.io/app-inspector" target="_blank">
            <img className="page-logo" src="//npmcdn.com/macaca-logo@latest/svg/monkey.svg" />
            <h1>Macaca App Inspector</h1>
            <GitHubButton
              type="stargazers"
              namespace="macacajs"
              repo="app-inspector"
            />
          </a>
        </div>
        {
          this.state.tree ? (
            <div className="main">
              <div className="flex-col">
                <Screen
                  frame={ this.state.focusBounds }
                  onClick={ this.handleCanvasClick.bind(this) }
                  isIOS={ this.state.isIOS }
                  src={ this.state.isIOS ? '/ios-screenshot.png' : '/android-screenshot.png' }
                />
              </div>
              <div className="flex-col" ref="treeScroller" style={{ position: 'relative' }}>
                <Tree
                  ref="tree"
                  width={ this.state.treeViewPortWidth }
                  onSelect={ this.handleTreeSelect.bind(this) }
                  onNodeMouseEnter={ this.handleMouseEnter.bind(this) }
                  onNodeMouseLeave={ this.handleMouseLeave.bind(this) }
                  initialData={ this.state.tree }
                />
              </div>
              {
                this.state.node ? (
                  <div className="flex-col">
                    <Info
                      node={ this.state.node }
                      xpath={ this.state.xpath }
                      xpath_lite={ this.state.xpath_lite }
                    />
                  </div>
                ) : null
              }
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
