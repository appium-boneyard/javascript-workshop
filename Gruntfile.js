'use strict';

var _ = require('lodash');

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

_.each(['ios', 'android'], function (system) {
  _(desireds[system]).each(function(desired, key) {
    gruntConfig.env[key] = {
      DESIRED: JSON.stringify(desired)
    };
    gruntConfig.concurrent['test-' + system].push('test:' + system + ':' + key);
  });
});


// by default, use Sauce Labs
if (process.env.SAUCE === undefined) {
  process.env.SAUCE = true;
}

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['test:sauce:7.1']);

  _.each(['ios', 'android'], function (system) {
    _(desireds[system]).each(function(desired, key) {
      grunt.registerTask('test:' + system + ':' + key, ['env:' + key, 'simplemocha:' + system]);
    });
  });

  grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);

  grunt.registerTask('test:ios:parallel', ['concurrent:test-ios']);
  grunt.registerTask('test:android:parallel', ['concurrent:test-android']);
  grunt.registerTask('test:all:parallel', ['concurrent:test-ios', 'concurrent:test-android']);
};
