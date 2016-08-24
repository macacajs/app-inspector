/* ================================================================
 * app-inspector by xdf(xudafeng[at]126.com)
 *
 * first created at : Wed Jul 27 2016 10:57:58 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var isIOS = $('#isIOS').val() === 'true';
var serverStarted = $('#serverStarted').val() === 'true';

var _ = {
  str2pos: function(data) {
    var bounds = data.bounds;
    bounds = bounds.match(/[\d\.]+/g);
    var leftTop = {
      x: parseInt(bounds[0], 10),
      y: parseInt(bounds[1], 10)
    };
    var rightBottom = {
      x: isIOS ? parseInt(bounds[0], 10) + parseInt(bounds[2], 10) : parseInt(bounds[2], 10),
      y: isIOS ? parseInt(bounds[1], 10) + parseInt(bounds[3], 10) : parseInt(bounds[3], 10)
    };
    return {
      leftTop: leftTop,
      rightBottom: rightBottom
    };
  },
  isInRect: function(pos, leftTop, rightBottom) {
    return pos.x >= leftTop.x
      && pos.x <= rightBottom.x
      && pos.y >= leftTop.y
      && pos.y <= rightBottom.y;
  },
  getAndroidNodeData: function(originPos) {
    var node = null;
    var postTraverse = function(root) {
      var pos = _.str2pos(root);
      var leftTop = pos.leftTop;
      var rightBottom = pos.rightBottom;

      if (_.isInRect(originPos, leftTop, rightBottom)) {
        node = root;
      }
      if (root.nodes) {
        for (var i = 0; i < root.nodes.length; i++) {
          postTraverse(root.nodes[i]);
        }
      }
    };
    postTraverse(globalData);
    return node;
  },
  getIOSNodeData: function(originPos) {
    var node = null;
    var postTraverse = function(root) {
      var pos = _.str2pos(root);
      var leftTop = pos.leftTop;
      var rightBottom = pos.rightBottom;

      if (_.isInRect(originPos, leftTop, rightBottom) && parseInt(root.isVisible, 10) && root.type !== 'Window') {
        node = root;
      }
      if (root.nodes) {
        for (var i = 0; i < root.nodes.length; i++) {
          postTraverse(root.nodes[i]);
        }
      }
    };

    postTraverse(globalData);
    return node;
  }
};

function Inspector() {
  this.init();
}

Inspector.prototype.init = function() {
  var that = this;
  this.rate = 1;
  this.maskWidth = 0;
  this.maskHeight = 0;
  this.globalData = null;
  this.maskContext = null;
  this.treeElement = $('#tree');
  this.infoElement = $('#info');
  this.maskElement = $('#mask');
  this.loadImg(function() {
    that.getXML();
    that.initMask();
    that.bindEvent();
  });
};

Inspector.prototype.initMask = function() {
  var canvas = this.maskElement[0];
  canvas.width = this.maskWidth;
  canvas.height = this.maskHeight;
  var context = canvas.getContext('2d');
  context.fillStyle = 'red';
  context.globalAlpha = 0.5;
  this.maskContext = context;
};

Inspector.prototype.renderRect = function(data) {
  var pos = _.str2pos(data);
  var leftTop = pos.leftTop;
  var rightBottom = pos.rightBottom;
  this.maskContext.clearRect(0, 0, this.maskWidth, this.maskHeight);
  this.maskContext.fillRect(leftTop.x * this.rate, leftTop.y * this.rate, (rightBottom.x - leftTop.x) * this.rate, (rightBottom.y - leftTop.y) * this.rate);
};

Inspector.prototype.loadImg = function(cb) {
  var that = this;
  var img = new Image();
  img.src = '/' + (isIOS ? 'ios' : 'android') + '-screenshot.png';
  img.onload = function(e) {
    var width = img.width;
    var height = img.height;
    var naturalWidth = img.naturalWidth;

    that.rate = width / naturalWidth;

    if (isIOS) {
      that.rate *= 2;
    }

    that.maskWidth = width;
    that.maskHeight = height;
    cb();
  };
  $('#image').html(img);
};

Inspector.prototype.getXML = function() {
  var that = this;
  $.ajax({
    url: (isIOS ? 'ios' : 'android') + '.json',
    type: 'GET',
    timeout: 2000,
    success: function(data) {
      window.globalData = that.globalData = data;
      that.treeElement.treeview({
        data: [data],
        showIcon: false,
        showBorder: false,
        backColor: '#fffffe',
        selectedColor: '#ffffee',
        selectedBackColor: '#7b7b7b',
        searchResultColor: '#ffffee',
        searchResultBackColor: '#7b7b7b'
      })
      .on('nodeSelected', function(event, data) {
        that.treeElement.treeview('clearSearch');
        that.updateInfo(data);
        that.renderRect(data);
      });
    }
  });
};

Inspector.prototype.getXPath = function(node) {
  var treeview = this.treeElement.treeview(true);
  var current = node;
  var array = [];

  while (current) {
    array.unshift(current.class + '[' + (~~current.index + 1) +  ']');
    var parentId = current.parentId;
    if (parentId == null) {
      current = null;
    } else {
      current = treeview.getNode(parentId);
    }
  }

  return '//' + array.join('/');
},

Inspector.prototype.updateInfo = function(data) {
  var xpath = this.getXPath(data);
  var blackList = ['index', 'text', 'nodes', 'state', 'nodeId', 'parentId', 'rect'];
  var html = '<ul>';
  $.each(data, function(k, v) {
    if (!~blackList.indexOf(k)) {
      html += '<li>' + k + '<span class="pull-right">' + v + '</span>' + '</li>';
    }
  });
  html += '<li>XPath<span class="pull-right">' + xpath + '</span>' + '</li>';
  html += '</ul>';
  this.infoElement.html(html);
};

Inspector.prototype.searchNode = function(originPos) {
  var data = isIOS ? _.getIOSNodeData(originPos) : _.getAndroidNodeData(originPos);

  if (data) {
    this.renderRect(data);
    var selectedNode = this.treeElement.treeview('getSelected')[0];

    if (selectedNode) {
      this.treeElement.treeview('unselectNode', selectedNode);
    }
    var nodes = this.treeElement.treeview('clearSearch')
      .treeview('search', [data.text, {
        ignoreCase: true,
        exactMatch: false,
        revealResults: true,
      }]);
    this.updateInfo(nodes[0]);
  }
};

Inspector.prototype.bindEvent = function() {
  var that = this;

  $('body').on('click', '.screenshot', function(e) {
    var node = $(e.target);
    var offset = node.offset();
    var originPos = {
      x: (e.pageX - offset.left) / that.rate,
      y: (e.pageY - offset.top) / that.rate
    };
    that.searchNode(originPos);
  });
};

if (serverStarted) {
  new Inspector();
} else {
  $('footer .text-center').html('loading...');
  setTimeout(function() {
    location.reload();
  }, 3000);
}
