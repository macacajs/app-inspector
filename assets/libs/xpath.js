function getChildIndex(node, nodes) {
  let index = 0;

  for (var i = 0; i < nodes.length; i++) {
    var item = nodes[i];
    if (item.class === node.class) {
      index++;
    }
    if (node === item) {
      break;
    }
  }

  return index;
}

export default function getXpath(tree, nodePath, isIOS) {
  const array = [];
  let nodes = [tree];
  const paths = [0, ...nodePath];

  for (let i = 0; i < paths.length; i++) {
    let current = nodes[paths[i]];
    let index = getChildIndex(current, nodes);

    const tagName = (isIOS ? 'XCUIElementType' : '') + current.class;

    array.push(tagName + '[' + index +  ']');
    nodes = current.nodes;
  }

  return '//' + array.join('/');
};