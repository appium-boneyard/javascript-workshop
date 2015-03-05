/*global describe, it, before, after, afterEach */
'use strict';

var apps = require('../helpers/apps')
  , utils = require('../helpers/utils');


describe("ios native", function () {
  before(utils.before({
    app: apps.iosTestApp,
    name: 'Appium workshop ios native test',
    tags: ['appium', 'js', 'workshop', 'native', 'ios']
  }));

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
