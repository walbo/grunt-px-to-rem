/*
 * grunt-px-to-rem
 * https://github.com/walbo/grunt-px-to-rem
 *
 * Copyright (c) 2014 Petter Walbø Johnsgård
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('px_to_rem', 'Convert px to rem', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      base: 16
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath)

        // Replace all px to rem
        .replace(/([+-]?\d*\.?\d+)\s*px/g, function(match, value, unit) {
          var rem = (parseFloat(value) / options.base) + 'rem';

          if ( rem === '0rem' ) {
            rem = 0; // Values of 0 shouldn't have units specified
          }

          return rem;
        });
      });

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};