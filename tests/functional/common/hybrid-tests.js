'use strict';

module.exports.textTest = function (done) {
  // decide what kind of webview to wait for
  var webviewClassName = 'UIAWebView';
  if (process.env.DEVICE && process.env.DEVICE.toLowerCase() === 'android') {
    webviewClassName = 'android.webkit.WebView';
  }

  this.driver
    // switch into a webview
    .setImplicitWaitTimeout(600000)
    .waitForElementByClassName(webviewClassName)
      .click() // bide our time
    .contexts()
      .then(function (ctxs) {
        // sometimes the contexts haven't properly loaded
        return ctxs.length === 1 ? this.driver.contexts() : ctxs;
      }.bind(this))
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
    .sleep(2000)  // sleep simply for visual effect
    .nodeify(done);
};
