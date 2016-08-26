import React, { PureComponent } from 'react';
import { className, pick } from '../libs/utils';
import './tree.less';

const TreeNodeList = (props) => (
  <ul className="tree-list">
    {
      props.nodes.map((node, index) => (
        <li key={index}>
          <TreeNode
            onUpdate={props.onUpdate}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            path={props.path.concat([index])}
            data={node}/>
        </li>
      ))
    }
  </ul>
);

class TreeNode extends PureComponent {

  updateData(updater) {
    this.props.onUpdate(this.props.path, updater);
  }

  handleTagClick(e) {
    e.stopPropagation();
    const data = this.props.data;

    this.updateData({
      $open: !data.$open
    });
  }

  handleSelect() {
    const data = this.props.data;

    this.updateData({
      $selected: !data.$selected
    });
  }

  handleMouseEnter() {
    this.props.onMouseEnter(this.props.data);
  }

  handleMouseLeave() {
    this.props.onMouseLeave(this.props.data);
  }

  tagName() {
    return this.props.data.class.replace('android.widget.', '');
  }

  openTag() {
    return `<${this.tagName()}>`;
  }

  closeTag() {
    return `</${this.tagName()}>`;
  }

  render() {
    const props = this.props;
    const data = this.props.data;
    const childrenCount = data.nodes && data.nodes.length || 0;

    return (
      <div className={ className({
        'tree-has-child': childrenCount,
        'tree-open': data.$open,
        'tree-selected': data.$selected
      }) }>
        <div className="tree-line"
          onClick={this.handleSelect.bind(this)}
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
          >
          <span className="tree-indent" style={{
            width: props.path.length * 20 + 'px'
          }}></span>
          <span className="tree-trigger" onClick={this.handleTagClick.bind(this)}></span>
          <span className="tree-tag-open">
            { this.openTag(data) }
          </span>
          {
            !data.$open && childrenCount ? '...' : null
          }
          {
            !data.$open || !childrenCount ? (
              <span className="tree-tag-close">
                { this.closeTag(data) }
              </span>
            ) : null
          }
        </div>
        {
          childrenCount && data.$open ? (
            [
              <TreeNodeList
                nodes={data.nodes}
                path={props.path}
                onUpdate={props.onUpdate}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                key="list"
              />,
              <div className="tree-line"
                onClick={this.handleSelect.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                key="end"
                >
                <span className="tree-indent" style={{
                  width: props.path.length * 20 + 'px'
                }}></span>
                <span className="tree-tag-close">
                  { this.closeTag(data) }
                </span>
              </div>
            ]
          ) : null
        }
      </div>
    );
  }

}

export default class Tree extends PureComponent {

  constructor(props) {
    super();
    this.state = {
      data: this.expandShallow(props.initialData, 5)
    };
    window.tree = this;
  }

  expandShallow(data, depth) {
    data.$open = true;
    const nodes = data.nodes;

    if (nodes && depth > 1) {
      for (let i = 0; i < nodes.length; i++) {
        this.expandShallow(nodes[i], depth - 1);
      }
    }

    return data;
  }

  handleNodeUpdate(nodePath, updater) {
    let root = this.state.data;
    let updateResult = { root };

    /**
     * if a node will be selected,
     * the previous selected node (is exist) must be unselected.
     */
    if (updater.$selected) {
      if (this.selectedPath) {
        updateResult = this.updateDate(updateResult.root, this.selectedPath, {
          $selected: false
        });
      }
      this.selectedPath = nodePath;
    }

    /**
     * if a node will expand
     * it's all ancestors will expand too.
     */
    const bubble = updater.$open ? { $open: true } : null;
    updateResult = this.updateDate(updateResult.root, nodePath, updater, bubble);

    this.setState({
      data: updateResult.root
    });

    if (updater.$selected) {
      this.props.onSelect(updateResult.node, nodePath);
    }
  }

  focus(nodePath) {
    this.handleNodeUpdate(nodePath, {
      $open: true,
      $selected: true
    });
  }

  /**
   * root is an immutable data. each time it update, should return a diffrent one.
   * it will be clone along the nodePath.
   */
  updateDate(root, nodePath, updater, bubble) {
    let len = nodePath.length;
    let node = root;
    let nodes;
    let index;

    let bubbleUpdater;
    if (bubble === true) {
      bubbleUpdater = updater;
    } else if (bubble) {
      bubbleUpdater = pick(updater, bubble);
    }

    for (let i = 0; i < len + 1; i++) {
      if (i === len) {
        node = Object.assign({}, node, updater);
      } else {
        node = Object.assign({}, node, bubbleUpdater);
      }

      if (nodes) {
        nodes[index] = node;
      } else {
        root = node;
      }

      if (i < len) {
        nodes = node.nodes = node.nodes.concat();
        index = nodePath[i];
        node = nodes[index];
      }
    }
    return {
      root, node
    };
  }

  render() {
    return (
      <div className="list-view" style={{
        width: this.props.width ? this.props.width + 'px' : 'auto'
      }}>
        <TreeNode
          onMouseEnter={this.props.onNodeMouseEnter}
          onMouseLeave={this.props.onNodeMouseLeave}
          onUpdate={this.handleNodeUpdate.bind(this)}
          path={[]}
          data={this.state.data}
        />
      </div>
    );
  }
};

Tree.defaultProps = {
  onSelect() {},
  onHover() {},
  onNodeMouseEnter() {},
  onNodeMouseLeave() {},
  width: null
};