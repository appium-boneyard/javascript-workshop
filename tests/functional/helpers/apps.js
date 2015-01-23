'use strict';

if (process.env.SAUCE) {
  module.exports = {
    iosTestApp: "https://appium.s3.amazonaws.com/TestApp7.1.app.zip",
    iosWebviewApp: "http://appium.github.io/appium/assets/WebViewApp7.1.app.zip",
    iosUICatalogApp: "http://appium.github.io/appium/assets/UICatalog7.1.app.zip",
    androidApiDemos: "http://appium.github.io/appium/assets/ApiDemos-debug.apk",
    selendroidTestApp: "http://appium.github.io/appium/assets/selendroid-test-app-0.10.0.apk",
    iosGappiumApp: 'https://appium.s3.amazonaws.com/HelloGappium.app.zip',

    iosWebviewAppLocal: "http://localhost:3000/WebViewApp7.1.app.zip",
    androidApiDemosLocal: "http://localhost:3000/ApiDemos-debug.apk"
  };
} else {
  module.exports = {
    iosTestApp: "sample-code/apps/TestApp/build/Release-iphonesimulator/TestApp.app",
    iosWebviewApp: "sample-code/apps/WebViewApp/build/Release-iphonesimulator/WebViewApp.app",
    iosUICatalogApp: "sample-code/apps/UICatalog/build/Release-iphonesimulator/UICatalog.app",
    androidApiDemos: "sample-code/apps/ApiDemos/bin/ApiDemos-debug.apk",
    selendroidTestApp: "sample-code/apps/selendroid-test-app.apk",
    iosGappiumApp: '/Users/isaac/code/javascript-workshop/apps/HelloGappium.app.zip'
  };
}
