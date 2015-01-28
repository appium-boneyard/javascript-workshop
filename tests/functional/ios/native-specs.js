/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps')
  , utils = require('../helpers/utils');

describe("ios native", function () {
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED);
    desired = _.extend(desired, {
      app: apps.iosTestApp,
      name: 'Appium workshop native test',
      tags: ['appium', 'js', 'workshop', 'native', 'ios']
    });
    this.allPassed = true;
    this.driver = setup();
    this.driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(utils.afterEach);

  after(utils.after);


  it('should be able to do stuff', function (done) {
    this.driver
      .waitForElementByAccessibilityId('TextField1')
        .sendKeys('10')
      .waitForElementByAccessibilityId('TextField2')
        .sendKeys('8')
      .waitForElementByAccessibilityId('ComputeSumButton')
        .click().sleep(1000)
      .elementByClassName('UIAStaticText')
        .text().should.become('18')
      .nodeify(done);
  });
});
