'use strict';

var _ = require('lodash');


// by default, use Sauce Labs
// if you don't want Sauce, use SAUCE=false
if (process.env.SAUCE === undefined) {
  process.env.SAUCE = true;
}


var desireds = require('./tests/functional/helpers/caps');

var gruntConfig = {
  env: {
    // dynamically filled
  },
  simplemocha: {
    ios: {
      options: {
        timeout: 120000,
        reporter: 'spec'
      },
      src: ['tests/functional/ios/*-specs.js']
    },
    android: {
      options: {
        timeout: 120000,
        reporter: 'spec'
      },
      src: ['tests/functional/android/*-specs.js']
    },
  },
  concurrent: {
    // dynamically filled
    'test-ios': [],
    'test-android': [],
    'test-all': [],
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
    gruntfile: {
      src: 'Gruntfile.js'
    },
    test: {
      src: ['tests/**/*.js']
    },
  },
};


// configure
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  var tests = [];
  _.each(['ios', 'android'], function (system) {
    var systemTests = [];
    _(desireds[system]).each(function(desired, key) {
      // put together environments for each test
      gruntConfig.env[key] = {
        DESIRED: JSON.stringify(desired)
      };

      var name = 'test:' + system + ':' + key;

      // establish the list of tasks for the system's concurrent task
      gruntConfig.concurrent['test-' + system].push('test:' + system + ':' + key);
      // establish the list of tasks for all concurrent tasks
      gruntConfig.concurrent['test-all'].push(name);

      // make a task for this particular cap (e.g., grunt test:ios:7.1)
      grunt.registerTask(name, ['env:' + key, 'simplemocha:' + system]);

      // add to the list of tests for this particular system
      systemTests.push(name);

      // add to the list of tests that will be performed as 'all'
      tests.push(name);
    });
    // make a task for a particular system (e.g., grunt test:ios)
    grunt.registerTask('test:' + system, systemTests);
  });
  // make a task that does all the systems, serially
  grunt.registerTask('test:all', tests);

  // make parallel tasks
  grunt.registerTask('test:ios:parallel', ['concurrent:test-ios']);
  grunt.registerTask('test:android:parallel', ['concurrent:test-android']);
  grunt.registerTask('test:all:parallel', ['concurrent:test-all']);

  // default task
  grunt.registerTask('default', ['test:all']);
};
