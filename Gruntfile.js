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

    // Jscs default style is grunt
    jscs: {
      all: [
        'tasks/*.js'
      ],
      options: {
        'preset': 'grunt'
      }
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
      custom_options_base: {
        options: {
          base: 10
        },
        files: {
          'tmp/style_custom_base.css': ['test/style.css'],
        },
      },
      with_sourcemap: {
        options: {
          map: true,
          ignore: ['border','border-left','border-right','border-top','border-bottom']
        },
        files: {
          'tmp/style_sourcemap.css': ['test/style_sourcemap.css'],
        },
      },
      with_sourcemap_custom_options: {
        options: {
          base: 16,
          fallback: true,
          max_decimals: 2,
          map: true,
          ignore: ['border','border-left','border-right','border-top','border-bottom']
        },
        files: {
          'tmp/style_sourcemap_custom.css': ['test/style_sourcemap.css'],
        },
      },
    },

    // Sass
    sass: {
      main: {
        options: {
          'sourcemap': 'none'
        },
        files: {
          'test/style.css': 'test/sass/main.scss'
        }
      },
      sourcemap: {
        files: {
          'test/style_sourcemap.css': 'test/sass/main.scss'
        }
      }
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
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'jscs', 'px_to_rem', 'nodeunit']);
  grunt.registerTask('walbo', ['clean', 'sass', 'px_to_rem']);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'walbo']);

};
