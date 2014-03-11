/*
 * grunt-px-to-rem
 * https://github.com/walbo/grunt-px-to-rem
 *
 * Copyright (c) 2014 Petter Walbø Johnsgård
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('px_to_rem', 'Convert px to rem', function() {
        
        // Options
        var options = this.options({
            base: 16,
            fallback: false
        });

        var pxToRem = function (css) {
            var postcss = require('postcss'),
                processor = postcss(function (css) {
                    css.eachDecl(function (decl, i) {
                        var value = decl.value;

                        // Values of 0 shouldn't have units specified. Return 0
                        if (value.indexOf('!0px') === 0 || value.indexOf('0rem') === 0 || value.indexOf('0px') === 0) {
                            decl.value = '0';
                        }
                        
                        // Change !px values to px
                        else if (value.indexOf('!') !== -1) {
                            value = value.replace('!','');

                            decl.value = value;
                        }

                        // If already rem, create fallback if options.fallback else return rem.
                        else if (value.indexOf('rem') !== -1) {

                            if(options.fallback) {
                                value = value.replace(/(\d*\.?\d+)rem/ig, function ($1, $2) {
                                    return Math.floor(parseFloat($2) * options.base) + 'px';
                                });

                                decl.parent.insertBefore(i, decl.clone({ value: value }));
                            } else {
                                decl.value = value;
                            }
                        } 

                        // Convert px to rem
                        else {
                            value = value.replace(/(\d*\.?\d+)px/ig, function ($1, $2) {
                                return parseFloat($2 / options.base) + 'rem';
                            });

                            if(options.fallback) {
                                decl.parent.insertBefore(i, decl.clone());
                                decl.value = value;
                            } else {
                                decl.value = value;
                            }
                        }
                    });
                });

            return processor.process(css).css;
        };

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
                // Read file source && convert to rem unit
                var css = pxToRem( grunt.file.read(filepath) );
                return css;
            });

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('Converted px to rem in "' + f.dest + '".');
        });
    });
};