'use strict';

var path = require('path');

if (process.env.SAUCE) {
  module.exports = {
    iosTestApp: 'https://appium.s3.amazonaws.com/TestApp7.1.app.zip',
    androidContactManager: 'https://appium.s3.amazonaws.com/ContactManager.apk',
    iosGappiumApp: 'https://appium.s3.amazonaws.com/HelloGappium.app.zip',
    androidGappiumApp: 'https://appium.s3.amazonaws.com/HelloGappium-android.apk'
  };
} else {
  module.exports = {
    iosTestApp: path.resolve('apps/TestApp7.1.app.zip'),
    androidContactManager: path.resolve('apps/ContactManager.apk'),
    iosGappiumApp: path.resolve('apps/HelloGappium.app.zip'),
    androidGappiumApp: path.resolve('apps/HelloGappium-android.apk')
  };
}
