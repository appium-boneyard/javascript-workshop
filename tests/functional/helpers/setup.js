"use strict;"

var wd = require('wd')
  , serverConfigs = require('../helpers/servers');

// set up chai so our tests run well
var chai = require("chai")
  , chaiAsPromised = require("chai-as-promised");
require('colors');
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;


module.exports = function (desired) {
  var driver = wd.promiseChainRemote(process.env.SAUCE ? serverConfigs.sauce : serverConfigs.local);

  if (process.env.VERBOSE){
    // optional logging     
    driver.on('status', function(info) {
      console.log(info.cyan);
    });
    driver.on('command', function(meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });            
  }
  //driver.init(desired);
  return driver;
};
