
/**
 * @param {string} bounds [0,0][640,1136]
 */
export function parseBounds(boundsStr, isIOS) {
  const matched = boundsStr.match(/[\d\.]+/g);
  const i = x => parseInt(x, 10);

  const leftTop = {
    x: i(matched[0]),
    y: i(matched[1]),
  };

  var rightBottom = {
    x: isIOS ? i(matched[0]) + i(matched[2]) : i(matched[2]),
    y: isIOS ? i(matched[1]) + i(matched[3]) : i(matched[3])
  };

  return {
    leftTop,
    rightBottom
  };
};

export function boundsSize(bounds) {
  const { leftTop, rightBottom } = bounds;
  return (rightBottom.x - leftTop.x) * (rightBottom.y - leftTop.y);
};

export function compareBoundsSize(rectA, rectB) {
  return boundsSize(rectA) > boundsSize(rectB);
};

export function isInRect(x, y, { leftTop, rightBottom }) {
  return x >= leftTop.x
    && x <= rightBottom.x
    && y >= leftTop.y
    && y <= rightBottom.y;
};

export function getNodePathByXY(tree, isIOS, x, y) {
  let bestBounds = null;
  let bestPath = null;

  function walk(node, path) {
    let bounds = parseBounds(node.bounds, isIOS);
    let inRect = isInRect(x, y, bounds);
    if (inRect) {
      if (!bestBounds || compareBoundsSize(bestBounds, bounds)) {
        bestBounds = bounds;
        bestPath = path;
      }

      if (node.nodes) {
        node.nodes.forEach((child, index) => {
          walk(child, path.concat([index]));
        });
      }
    }
  }

  walk(tree, []);

  return bestPath;
};
