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

export default function getXpath(tree, nodePath, isIOS) {

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

    if (resourceId && mapIdCount[resourceId] === 1) {
      XPath = `/*[@resource-id="${resourceId}"]`;
    } else if (rawIndentifier && mapRawIndentifierCount[rawIndentifier] === 1) {
      XPath = `/*[@name="${rawIndentifier}"]`;
    } else if (name && mapNameCount[name] === 1) {
      XPath = `/*[@name="${name}"]`;
    } else if (text && mapTextCount[text] === 1) {
      XPath = `/*[@text="${text}"]`;
    } else {
      if (current.class !== androidRootName) {
        XPath = `${XPath}/${isIOS ? 'XCUIElementType' : ''}${current.class}/[${index}]`;
      }
    }
    nodes = current.nodes;
  }
  return `/${XPath}`;
};
