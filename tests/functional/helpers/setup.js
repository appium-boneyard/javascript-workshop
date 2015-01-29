'use strict';

var wd = require('wd')
  , _ = require('lodash');


// set up chai so our tests run well
var chai = require("chai")
  , chaiAsPromised = require("chai-as-promised");
require('colors');
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;


// different command executors
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


// sauce authentication tokens
var SAUCE_USERNAME = process.env.SAUCE_USERNAME
  , SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

// make sure we have the right environment variables for Sauce
if (process.env.SAUCE) {
  if(!SAUCE_USERNAME || !SAUCE_ACCESS_KEY){
    console.warn(
      '\nPlease configure your sauce credential:\n\n' +
      'export SAUCE_USERNAME=<SAUCE_USERNAME>\n' +
      'export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>\n\n'
    );
    throw new Error("Missing sauce credentials");
  }
}


module.exports.getDesiredCapabilities = function (extras) {
  // set up desired capabilities correctly
  var desired;
  if (process.env.DEVICE && !process.env.DESIRED) {
    // running from mocha, need to populate the correct caps
    var device = process.env.DEVICE.split(':');
    desired = require('../helpers/caps')[device[0]][device[1]];
  } else {
    desired = JSON.parse(process.env.DESIRED);
  }

  process.env.DEVICE = desired.platformName;
  return _.extend(desired, extras);
};

module.exports.getDriver = function (desired, done) {
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
  driver
    .init(desired)
    .nodeify(done);
  return driver;
};
