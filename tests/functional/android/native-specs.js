/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps');

describe("android native", function () {
  var driver;
  var allPassed = true;

  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED || JSON.stringify(require('../helpers/caps').android['4.4']));
    desired = _.extend(desired, {
      app: apps.androidContactManager,
      browserName: '',
      name: 'Appium workshop native test',
      tags: ['appium', 'js', 'workshop', 'native', 'android']
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
      .elementByAccessibilityId('Add Contact')
        .click()
      .elementsByClassName('android.widget.EditText').at(0)
        .sendKeys('Appium User')
        .text().should.eventually.equal('Appium User')
      .elementsByClassName('android.widget.EditText').at(2)
        .sendKeys('someone@somewhere.com')
        .text().should.eventually.equal('someone@somewhere.com')
      .nodeify(done);
  });
});
