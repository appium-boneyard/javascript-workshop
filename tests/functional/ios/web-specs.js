/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , tests = require('../common/web-tests')
  , utils = require('../helpers/utils');


describe('ios mobile web', function () {
  // set up the driver object before the tests run
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED);
    desired = _.extend(desired, {
      browserName: 'safari',
      name: 'Appium workshop mobile web test',
      tags: ['appium', 'js', 'workshop', 'ios', 'web']
    });
    this.allPassed = true;
    this.driver = setup();
    this.driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(utils.afterEach);

  after(utils.after);


  it('should send and receive text', tests.textTest);
});
