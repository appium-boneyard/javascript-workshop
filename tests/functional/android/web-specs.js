/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , tests = require('../common/web-tests')
  , utils = require('../helpers/utils');


describe('android mobile web', function () {
  before(utils.before({
    browserName: 'Browser',
    name: 'Appium workshop mobile web test',
    tags: ['appium', 'js', 'workshop', 'android', 'web']
  }));

  afterEach(utils.afterEach);

  after(utils.after);


  it('should send and receive text', tests.textTest);
});
