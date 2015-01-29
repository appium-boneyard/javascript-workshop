'use strict';

// expects `this.driver` to exist
module.exports.textTest = function (done) {
  this.driver
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

};
