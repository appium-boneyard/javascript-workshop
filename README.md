# Appium JavaScript Workshop

Appium workshop using JavaScript.

Installation:

```shell
git clone git@github.com:imurchie/javascript-workshop.git
cd javascript-workshop
npm install
grunt
```


## Setting up tests

The main thing to do in order to set up tests is to get the desired capabilities correct.
These live in `tests/functional/helpers/caps.js`. This is a JavaScript hash object that
can be populated as you see fit.


## Running the tests

There are two ways to run the tests. Either directly with [`mocha`](http://mochajs.org/),
or using [`grunt`](http://gruntjs.com/). The latter is preferred.

Tests will, by default, run on [Sauce Labs](http://saucelabs.com), for which you
will need a username and access key set as the environment variables
`SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`, respectively. To run locally, use
`SAUCE=false`.

### Mocha

With `mocha`, you can use any options you feel like. But you will need to specify a
`DEVICE`, which is a valid key into the `caps.js` file. For instance, you can run:

```shell
DEVICE=android:4.4 mocha -t 90000 -R spec tests/functional/ios/web-specs.js
```

This will allow you to run specific tests with specific capabilities.

### Grunt

There are many `grunt` tasks available. Use `grunt --help` to see a list.

You can validate your tests with `jshint` using

```shell
grunt jshint
```

And you can "watch" `jshint` (i.e., run jshint on any updated files as they are
saved)

```shell
grunt watch
```

To see more logging, run with the environment variable `VERBOSE` on. E.g.,

```shell
VERBOSE=true grunt test:ios:7.1
```

To run tests, there are a variety of tasks. Each "system" (i.e., iOS or Android)
that you specify desired capabilities for will provide a test task. Thus for the
capabilities

```javascript
{
  "ios": {
    "7.1": {
      "browserName": null,
      "appiumVersion": "1.3.4",
      "platformName": "iOS",
      "platformVersion": "7.1",
      "deviceName": "iPhone Simulator",
      "app": null
    },
    "8.1": {
      "browserName": null,
      "appiumVersion": "1.3.4",
      "platformName": "iOS",
      "platformVersion": "8.1",
      "deviceName": "iPhone 5s",
      "app": null
    }
  },
  "android": {
    "4.4": {
      "browserName": "Browser",
      "appiumVersion": "1.3.4",
      "platformName": "Android",
      "platformVersion": "4.4",
      "deviceName": "Android Emulator",
      "app": null
    },
    "4.4c": {
      "browserName": "Chrome",
      "appiumVersion": "1.3.4",
      "platformName": "Android",
      "platformVersion": "4.4",
      "deviceName": "Android Emulator",
      "app": null
    }
  }
}
```

There will be available the following individual tasks

```shell
grunt test:ios:7.1
grunt test:ios:8.1
grunt test:android:4.4
grunt test:android:4.4c
```

There are also collective tasks, for running _all_ the tests for a system (or
all together) with all available capabilities

```shell
grunt test:android
grunt test:ios
grunt test:all
```

Finally, there are tests which do the same as the previous ones, but in parallel

```shell
grunt test:android:parallel
grunt test:ios:parallel
grunt test:all:parallel
```

