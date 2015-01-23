'use strict';

var _ = require('lodash');

var desireds = require('./tests/functional/helpers/caps');

var gruntConfig = {
  env: {
    // dynamically filled
  },
  simplemocha: {
    sauce: {
      options: {
        timeout: 90000,
        reporter: 'spec'
      },
      src: ['tests/functional/**/*-specs.js']
    },
    ios: {
      options: {
        timeout: 90000,
        reporter: 'spec'
      },
      src: ['tests/functional/ios/*-specs.js']
    },
  },
  concurrent: {
    // dynamically filled
    'test-sauce': [],
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
      options: {
          jshintrc: 'test/.jshintrc'
      },
      src: ['test/**/*.js']
    },
},
};

_.each(['ios', 'android'], function (system) {
  _(desireds[system]).each(function(desired, key) {
    gruntConfig.env[key] = {
      DESIRED: JSON.stringify(desired)
    };
    gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
    gruntConfig.concurrent['test-ios'].push('test:' + key);
  });
});

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['test:sauce:7.1']);
  grunt.registerTask('ios', ['test:ios']);

  _.each(['ios', 'android'], function (system) {
    _(desireds[system]).each(function(desired, key) {
      grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
      grunt.registerTask('test:' + key, ['env:' + key, 'simplemocha:' + system]);
    });
  });

  grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);

  grunt.registerTask('test:ios:parallel', ['concurrent:test-ios']);
  grunt.registerTask('test:android:parallel', ['concurrent:test-android']);
};
