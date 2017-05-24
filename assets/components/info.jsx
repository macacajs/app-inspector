import React, { PureComponent } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './info.less';

const blackList = [
  'index',
  'nodes',
  'selected',
  'open',
  'state',
  'nodeId',
  'parentId',
  'rect'
];

export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  filter(node) {
    const array = Object.keys(node)
    .filter(key => blackList.indexOf(key) < 0 && !/^\$/.test(key))
    .map(key => ({
      key, text: String(node[key])
    }));

    array.push({
      key: 'xpath',
      text: this.props.xpath
    });

    return array;
  }

  onCopy() {
    this.setState({
      copied: true
    });
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 1000)
  }

  render() {
    const node = this.props.node;
    const blackList = [];
    return (
      <ul className="info">
        {
          this.filter(node).map(item => (
            <li key={ item.key }>
              <label className={ item.key }>
                <a href="//macacajs.github.io/helpful-settings" target="_blank">
                { item.key }
                </a>
              </label>
              <CopyToClipboard text={ item.text }
                onCopy={ this.onCopy.bind(this) }>
                <div title="click to copy">{ item.text }</div>
              </CopyToClipboard>
            </li>
          ))
        }
        <li className={ this.state.copied ? 'fadeIn' : '' }>copied to clipboard</li>
      </ul>
    );
  }

};
