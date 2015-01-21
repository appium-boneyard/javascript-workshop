"use strict";

var wd = require('wd')
  , _ = require('underscore')
  , serverConfigs = require('../helpers/servers')
  , setup = require('../helpers/setup');

describe('ios mobile web', function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  // set up the driver object before the tests run
  before(function (done) { 
    var desired = _.extend(require('../helpers/caps').ios81, {
      browserName: 'safari',
      name: 'Appium workshop mobile web test',
      tags: ['appium', 'js', 'workshop']
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


  it('should send and receive text', function (done) {
    driver
      .get('http://saucelabs.com/test/guinea-pig')
      .elementById('i_am_an_id')
        .text().should.eventually.equal('I am a div')
      .elementById('comments')
        .sendKeys('This is an awesome and super-interesting comment')
      .elementById('submit')
        .click()
      .sleep(2000)
      .elementById('your_comments')
        .text().should.eventually.contain('This is an awesome and super-interesting comment')
      .nodeify(done);
  });
});
