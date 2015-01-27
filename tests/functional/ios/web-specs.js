/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup');


describe('ios mobile web', function () {
  var driver;
  var allPassed = true;

  // set up the driver object before the tests run
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED);
    desired = _.extend(desired, {
      browserName: 'safari',
      name: 'Appium workshop mobile web test',
      tags: ['appium', 'js', 'workshop', 'ios', 'web']
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

  // after all the tests, quit and update Sauce
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
