'use strict';

const assert = require('assert');

const _ = require('../../../lib/common/helper');

describe('lib/common/helper.test.js', () => {
  let res;
  it('getDeviceInfo()', () => {
    res = _.getDeviceInfo('00008020-001D4D38XXXXXXXX');
    assert.equal(res.isIOS, true);
    assert.equal(res.isRealIOS, true);
    res = _.getDeviceInfo('B8B6B1F5-30E0-401B-B1CE-70E4F39937A5');
    assert.equal(res.isIOS, true);
    assert.equal(res.isRealIOS, false);
  });
});