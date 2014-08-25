/*
 * grunt-px-to-rem
 * https://github.com/walbo/grunt-px-to-rem
 *
 * Copyright (c) 2014 Petter Walbø Johnsgård
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    px_to_rem: {
      default_options: {
        options: {
          ignore: ['border','border-left','border-right','border-top','border-bottom']
        },
        files: {
          'tmp/style.css': ['test/style.css'],
        },
      },
      custom_options: {
        options: {
          base: 16,
          fallback: true,
          max_decimals: 2,
          ignore: ['border','border-left','border-right','border-top','border-bottom']
        },
        files: {
          'tmp/style_custom.css': ['test/style.css'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'px_to_rem', 'nodeunit']);
  grunt.registerTask('walbo', ['clean', 'px_to_rem']);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'walbo']);

};
