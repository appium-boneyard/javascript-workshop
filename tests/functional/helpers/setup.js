'use strict';

var wd = require('wd');


// set up chai so our tests run well
var chai = require("chai")
  , chaiAsPromised = require("chai-as-promised");
require('colors');
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var SAUCE_USERNAME = process.env.SAUCE_USERNAME
  , SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

var servers = {
  local: {
    host: 'localhost',
    port: 4723
  },
  sauce: {
    host: 'ondemand.saucelabs.com',
    port: 80,
    username: SAUCE_USERNAME,
    password: SAUCE_ACCESS_KEY
  }
};


// by default, use Sauce Labs
// if you don't want Sauce, use SAUCE=false
if (process.env.SAUCE === undefined) {
  process.env.SAUCE = true;
}

// make sure we have the right environment variables for Sauce
if (process.env.SAUCE) {
  // checking sauce credentials
  if(!SAUCE_USERNAME || !SAUCE_ACCESS_KEY){
    console.warn(
      '\nPlease configure your sauce credential:\n\n' +
      'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
      'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
  }
}


if (process.env.DEVICE && !process.env.DESIRED) {
  // running from mocha, need to populate the correct caps
  var device = process.env.DEVICE.split(':');
  var caps = require('../helpers/caps')[device[0]][device[1]];
  process.env.DESIRED = JSON.stringify(caps);
}


module.exports = function () {
  var driver = wd.promiseChainRemote(process.env.SAUCE ? servers.sauce : servers.local);

  if (process.env.VERBOSE){
    // optional logging
    driver.on('status', function(info) {
      console.log(info.cyan);
    });
    driver.on('command', function(meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });
    driver.on('http', function(meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
  }
  return driver;
};
