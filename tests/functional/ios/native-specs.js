/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps');

describe("ios native", function () {
  var driver;
  var allPassed = true;

  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED || '{}');
    desired = _.extend(desired, {
      app: apps.iosTestApp,
      name: 'Appium workshop native test',
      tags: ['appium', 'js', 'workshop', 'native', 'ios']
    });
    driver = setup();
    driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  after(function(done) {
    if (process.env.SAUCE) {
      driver
        .quit()
        .sauceJobStatus(allPassed)
        .nodeify(done);
    } else {
      driver
        .quit()
        .nodeify(done);
    }
  });

  it('should be able to do stuff', function (done) {
    driver
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
