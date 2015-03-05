'use strict';
var appiumVer = "1.3.6";

module.exports = {
  ios: {
    '7.1': {
      browserName: undefined,
      appiumVersion: appiumVer,
      platformName: 'iOS',
      platformVersion: '7.1',
      deviceName: 'iPhone Simulator',
      app: undefined // will be set later
    },
    '8.1': {
      browserName: '',
      appiumVersion: appiumVer,
      platformName: 'iOS',
      platformVersion: '8.1',
      deviceName: 'iPhone 5s',
      app: undefined // will be set later
    },
  },

  android: {
    '4.4': {
      browserName: 'Browser',
      appiumVersion: appiumVer,
      platformName: 'Android',
      platformVersion: '4.4',
      deviceName: 'Android Emulator',
      app: undefined
    },
    '4.4c': {
      browserName: 'Chrome',
      appiumVersion: appiumVer,
      platformName: 'Android',
      platformVersion: '4.4',
      deviceName: 'Android Emulator',
      app: undefined
    }
  },
};
