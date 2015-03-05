/*global describe, it, before, after, afterEach */
'use strict';

var tests = require('../common/web-tests')
  , utils = require('../helpers/utils');


describe('ios mobile web', function () {
  before(utils.before({
    browserName: 'safari',
    name: 'Appium workshop ios mobile web test',
    tags: ['appium', 'js', 'workshop', 'ios', 'web']
  }));

  afterEach(utils.afterEach);

  after(utils.after);


  it('should send and receive text', tests.textTest);
});
