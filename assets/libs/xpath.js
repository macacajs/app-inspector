var arrKeyAttrs = [
  'resource-id',    // Android
  'rawIndentifier', // iOS
  'name',           // Android & iOS
  'text',           // Android
  'value'           // iOS
];

var mapIdCount = {};
var mapRawIndentifierCount = {};
var mapTextCount = {};
var mapNameCount = {};
var mapValueCount = {};
var isScan = false;

const androidRootName = 'MacacaAppInspectorRoot';

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

function scanNode(nodes) {

  if (!isScan) {

    if (!nodes) {
      return;
    }

    for (let i = 0; i < nodes.length; i++) {
      let current = nodes[i];
      arrKeyAttrs.forEach(attr => {
        let value = current[attr];

        if (value) {
          switch (attr) {
            case 'resource-id':
              mapIdCount[value] = mapIdCount[value] && mapIdCount[value] + 1 || 1;
              break;
            case 'rawIndentifier':
              mapRawIndentifierCount[value] = mapRawIndentifierCount[value] && mapRawIndentifierCount[value] + 1 || 1;
              break;
            case 'name':
              mapNameCount[value] = mapNameCount[value] && mapNameCount[value] + 1 || 1;
              break;
            case 'text':
              mapTextCount[value] = mapTextCount[value] && mapTextCount[value] + 1 || 1;
              break;
            case 'value':
              mapValueCount[value] = mapValueCount[value] && mapValueCount[value] + 1 || 1;
              break;
          }
        }
      });
      scanNode(current.nodes);
    }
  }
}

export function getXPathLite(tree, nodePath) {

  scanNode([tree]);
  isScan = true;

  const array = [];
  let nodes = [tree];
  const paths = [0, ...nodePath];

  let XPath = '';

  for (let i = 0; i < paths.length; i++) {
    let current = nodes[paths[i]];
    let name = current['name'];
    let resourceId = current['resource-id'];
    let text = current['text'];
    let value = current['value'];
    let rawIndentifier = current['rawIndentifier'];

    let index = getChildIndex(current, nodes);

    if (resourceId && mapIdCount[resourceId] === 1 && resourceId.trim()) {
      XPath = `/*[@resource-id="${resourceId.trim()}"]`;
    } else if (rawIndentifier && mapRawIndentifierCount[rawIndentifier] === 1 && rawIndentifier.trim()) {
      XPath = `/*[@name="${rawIndentifier.trim()}"]`;
    } else if (name && mapNameCount[name] === 1 && name.trim()) {
      XPath = `/*[@name="${name.trim()}"]`;
    } else if (text && mapTextCount[text] === 1 && text.trim()) {
      XPath = `/*[@text="${text.trim()}"]`;
    } else {
      if (current.class !== androidRootName) {
        XPath = `${XPath}/${current.class}[${index}]`;
      }
    }
    nodes = current.nodes;
  }
  return `/${XPath}`;
};

export function getXPath(tree, nodePath) {
  const array = [];
  let nodes = [tree];
  const paths = [0, ...nodePath];

  for (let i = 0; i < paths.length; i++) {
    let current = nodes[paths[i]];
    let index = getChildIndex(current, nodes);

    const tagName = current.class;

    if (current.class !== androidRootName) {
      array.push(`${tagName}[${index}]`);
    }
    nodes = current.nodes;
  }

  return `//${array.join('/')}`;
};
