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

// make sure we have the right environment variables for Sauce
if (process.env.SAUCE) {
  // checking sauce credentials
  if(!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY){
    console.warn(
      '\nPlease configure your sauce credential:\n\n' +
      'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
      'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
  }
}


module.exports = function () {
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
  return driver;
};
