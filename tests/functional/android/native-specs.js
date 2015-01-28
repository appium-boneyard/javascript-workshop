/*global describe, it, before, after, afterEach */
'use strict';

var _ = require('lodash')
  , setup = require('../helpers/setup')
  , apps = require('../helpers/apps')
  , utils = require('../helpers/utils');

describe("android native", function () {
  before(function (done) {
    var desired = JSON.parse(process.env.DESIRED);
    desired = _.extend(desired, {
      app: apps.androidContactManager,
      browserName: '',
      name: 'Appium workshop native test',
      tags: ['appium', 'js', 'workshop', 'native', 'android']
    });
    this.allPassed = true;
    this.driver = setup();
    this.driver
      .init(desired)
      .nodeify(done);
  });

  afterEach(utils.afterEach);

  after(utils.after);


  it('should be able to do stuff', function (done) {
    this.driver
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
