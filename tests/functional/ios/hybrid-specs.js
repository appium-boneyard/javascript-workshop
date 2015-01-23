"use strict";

var wd = require('wd')
  , _ = require('lodash')
  , serverConfigs = require('../helpers/servers')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps');

describe("ios hybrid", function () {
  var driver;
  var allPassed = true;

  // set up the driver object before the tests run
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED || '{}');
    desired = _.extend(desired, {
      app: apps.iosGappiumApp,
      name: 'Appium workshop hybrid test',
      tags: ['appium', 'js', 'workshop', 'ios', 'hybrid']
    });
    driver = setup();
    driver
      .init(desired)
      .nodeify(done);
  });

  // after each test, re-evaluate whether the whole thing passed or failed
  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  // after all the tests, quit and update Sauce (if necessary)
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
