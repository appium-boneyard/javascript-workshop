'use strict';

module.exports = {
  ios: {
    '7.1': {
      browserName: undefined,
      appiumVersion: '1.3.4',
      platformName: 'iOS',
      platformVersion: '7.1',
      deviceName: 'iPhone Simulator',
      app: undefined // will be set later
    },
    '8.0': {
      browserName: '',
      appiumVersion: '1.3.4',
      platformName: 'iOS',
      platformVersion: '8.0',
      deviceName: 'iPhone Simulator',
      app: undefined // will be set later
    },
  },

  android: {
    '4.4': {
      browserName: 'Browser',
      appiumVersion: '1.3.4',
      platformName: 'Android',
      platformVersion: '4.4',
      deviceName: 'Android Emulator',
      app: undefined
    },
    '4.4c': {
      browserName: 'Chrome',
      appiumVersion: '1.3.4',
      platformName: 'Android',
      platformVersion: '4.4',
      deviceName: 'Android Emulator',
      app: undefined
    }
  },
};
