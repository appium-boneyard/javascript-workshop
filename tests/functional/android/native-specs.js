/*global describe, it, before, after, afterEach */
'use strict';

var apps = require('../helpers/apps')
  , utils = require('../helpers/utils');


describe("android native", function () {
  before(utils.before({
    app: apps.androidContactManager,
    browserName: '',
    name: 'Appium workshop native test',
    tags: ['appium', 'js', 'workshop', 'native', 'android']
  }));

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
