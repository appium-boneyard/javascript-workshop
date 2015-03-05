'use strict';
var asserters = require('wd').asserters;

// expects `this.driver` to exist
module.exports.textTest = function (done) {
  var sampleText = 'This is an awesome and super-interesting comment';
  this.driver
    .get('http://saucelabs.com/test/guinea-pig')
    .elementById('i_am_an_id')
      .text().should.eventually.equal('I am a div')
    .elementById('comments')
      .sendKeys(sampleText)
    .elementById('submit')
      .click()
    .waitForElementById('your_comments',
                        asserters.textInclude(sampleText), 3000, 1000)
    .nodeify(done);
};
