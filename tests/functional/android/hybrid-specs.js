/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps')
  , utils = require('../helpers/utils');

describe("android hybrid", function () {
  // set up the driver object before the tests run
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED);
    desired = _.extend(desired, {
      app: apps.androidGappiumApp,
      browserName: '',
      name: 'Appium workshop hybrid test',
      tags: ['appium', 'js', 'workshop', 'android', 'hybrid']
    });
    this.allPassed = true;
    this.driver = setup();
    this.driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(utils.afterEach);

  after(utils.after);


  // test sending and retrieving text
  // the app is a PhoneGap/Cordova app, which takes some time to load,
  // so there are some timing issues here
  it('should send and receive text', function (done) {
    this.driver
      // switch into a webview
      .setImplicitWaitTimeout(600000)
      .waitForElementByClassName('android.webkit.WebView')
        .click() // bide our time
      .contexts()
        .then(function (ctxs) {
          // sometimes the contexts haven't properly loaded
          return ctxs.length === 1 ? this.driver.contexts() : ctxs;
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
