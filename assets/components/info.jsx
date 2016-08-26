import React, { PureComponent } from 'react';
import './info.less';

const blackList = ['index', 'text', 'nodes', 'selected', 'open', 'state', 'nodeId', 'parentId', 'rect'];

export default class App extends PureComponent {

  filter(node) {
    const array = Object.keys(node)
    .filter(key => blackList.indexOf(key) < 0 && !/^\$/.test(key))
    .map(key => ({
      key, text: String(node[key])
    }));

    array.push({
      key: 'XPath',
      text: this.props.XPath
    });

    return array;
  }

  render() {
    const node = this.props.node;
    const blackList = [];
    return (
      <ul className="info">
        {
          this.filter(node).map(item => (
            <li key={item.key}>
              <label>{item.key}</label>
              <div>{item.text}</div>
            </li>
          ))
        }
      </ul>
    );
  }

};
