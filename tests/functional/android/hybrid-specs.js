/*global describe, it, before, after, afterEach */
'use strict';

var apps = require('../helpers/apps')
  , tests = require('../common/hybrid-tests')
  , utils = require('../helpers/utils');


describe("android hybrid", function () {
  before(utils.before({
    app: apps.androidGappiumApp,
    browserName: '',
    name: 'Appium workshop hybrid test',
    tags: ['appium', 'js', 'workshop', 'android', 'hybrid']
  }));

  afterEach(utils.afterEach);

  after(utils.after);


  // test sending and retrieving text
  // the app is a PhoneGap/Cordova app, which takes some time to load,
  it('should send and receive text', tests.textTest);
});
