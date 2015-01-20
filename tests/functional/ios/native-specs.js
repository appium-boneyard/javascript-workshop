"use strict";

var wd = require("wd"),
  _ = require('underscore'),
  serverConfigs = require('../helpers/servers'),
  setup = require('../helpers/setup');

describe("ios native", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function (done) { 
    var desired = _.extend(require('../helpers/caps').ios81, {
      app: 'http://appium.github.io/appium/assets/TestApp7.1.app.zip',
      name: 'Appium workshop native test'
    });
    driver = setup(desired); 
    driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');  
    done();
  });

  after(function(done) {
    driver
      .quit()
      .sauceJobStatus(allPassed)
      .nodeify(done);
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
