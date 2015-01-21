"use strict";

var wd = require("wd")
  , _ = require('underscore')
  , serverConfigs = require('../helpers/servers')
  , setup = require('../helpers/setup');

describe("ios hybrid", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  // set up the driver object before the tests run
  before(function (done) { 
    var desired = _.extend(require('../helpers/caps').ios81, {
      app: 'https://appium.s3.amazonaws.com/HelloGappium.app.zip',
      name: 'Appium workshop hybrid test'
    });
    driver = setup(desired); 
    driver
      .init(desired)
      .nodeify(done);
  });

  // after each test, re-evaluate whether the whole thing passed or failed
  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');  
    done();
  });

  // after all the tests, quit and update Sauce
  after(function(done) {
    driver
      .quit()
      .sauceJobStatus(allPassed)
      .nodeify(done);
  });


  // test sending and retrieving text
  // the app is a PhoneGap/Cordova app, which takes some time to load,
  // so there are some timing issues here  
  it('should send and receive text', function (done) {
    driver
      // switch into a webview
      .setImplicitWaitTimeout(600000)
      .waitForElementByClassName('UIAWebView')  
        .click() // bide our time
      .contexts()
        .then(function (ctxs) {
          // sometimes the contexts haven't properly loaded
          return ctxs.length === 1 ? driver.contexts() : ctxs;
        })
        .should.eventually.have.length(2)
      .context('WEBVIEW')
      .elementByCss('.search-key')
        .sendKeys('j')
      .elementsByCss('.topcoat-list a')
        .then (function (employees) {
          employees.should.have.length(5);
          return employees[3];
        })
        .click()
      .elementsByCss('.actions a')
        .then(function (options) {
          options.should.have.length(6);
          return options[3];
        })
        .click()
      .sleep(2000)
      .nodeify(done);
  });
});
