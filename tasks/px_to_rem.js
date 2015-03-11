/*
 * grunt-px-to-rem
 * https://github.com/walbo/grunt-px-to-rem
 *
 * Copyright (c) 2014 Petter Walbø Johnsgård
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('px_to_rem', 'Convert px to rem', function() {

    /*
     * Default options
     */
    var options = this.options({
      base: 16,
      fallback: false,
      fallback_existing_rem: false,
      max_decimals: 20,
      ignore: [],
      map: false
    });

    var pxToRem = function(css, from, to) {
      var postcss = require('postcss');
      var processor = postcss(function(css) {
        css.eachRule(function(rule, i) {
          /**
           * Find elements that has fallback allready
           */
          var hasFallback = checkFallback(rule.nodes);

          rule.eachDecl(function(decl, i) {
            /**
             * Values of 0 shouldn't have units specified.
             */
            decl.value = decl.value.replace(/([!]?\d*\.?\d+)\s*(pxi|px|rem)/g, function($1) {
              if ($1 === '0pxi' || $1 === '0px' || $1 === '0rem') {
                $1 = 0;
              }
              return $1;
            });

            /**
             * If prop is black listed return.
             */
            if (options.ignore.indexOf(decl.prop) !== -1) {
              return;
            }

            var value = decl.value;

            /**
             * Change pxi values to px
             * note: Is this nessasary after px_to_rem got ignore option?
             */
            if (value.match(/(pxi)/)) {
              value = value.replace('pxi', 'px');
              decl.value = value;
            } else {
              /**
               * If fallback exists return value
               */
              if (hasFallback.indexOf(decl.prop) !== -1) {
                return decl.value;
              }

              /**
               * Fallback functions
               */
              if (options.fallback && options.fallback_existing_rem && value.indexOf('rem') !== -1) {
                /**
                 * If already rem, create fallback
                 * if options.fallback && options.fallback_existing_rem
                 */
                value = value.replace(/(\d*\.?\d+)rem/ig, function($1, $2) {
                  return Math.floor(parseFloat($2) * options.base) + 'px';
                });

                decl.parent.insertBefore(i, decl.clone({value: value}));
                decl.fallback = true;
              } else if (options.fallback && value.indexOf('rem') !== -1 && value.indexOf('px') !== -1) {
                /**
                 * If for some reason a user places both rem and px in same node.
                 * Do fallback even if options.fallback_existing_rem is false,
                 * but options.fallback is true.
                 */
                value = value.replace(/(\d*\.?\d+)rem/ig, function($1, $2) {
                  return Math.floor(parseFloat($2) * options.base) + 'px';
                });

                decl.parent.insertBefore(i, decl.clone({value: value}));
                decl.fallback = true;
              }

              /**
               * Convert PX to REM
               */
              if (value.indexOf('px') !== -1) {
                value = value.replace(/(\d*\.?\d+)px/ig, function($1, $2) {
                  return parseFloat($2 / options.base).maxDecimals(options.max_decimals) + 'rem';
                });

                if (options.fallback && !decl.fallback) {
                  decl.parent.insertBefore(i, decl.clone());
                }

                decl.value = value;
              }
            }
          });
        });
      });

      return processor.process(css,
        {
          map: (typeof options.map === 'boolean') ? options.map : {
          prev: getPrevMap(from),
          inline: (typeof options.map.inline === 'boolean') ? options.map.inline : true,
          annotation: (typeof options.map.annotation === 'boolean') ? options.map.annotation : true,
          sourcesContent: (typeof options.map.sourcesContent === 'boolean') ? options.map.sourcesContent : true
        },
        from: from,
        to: to
      });
    };

    /**
     * Get previous map
     */
    function getPrevMap(from) {
      if (typeof options.map.prev === 'string') {
        var mapPath = options.map.prev + path.basename(from) + '.map';

        if (grunt.file.exists(mapPath)) {
          return grunt.file.read(mapPath);
        }
      }
    }

    /**
     * Function to check if rem and px exist
     */
    function checkFallback(obj) {
      var props = [];
      var hasFallback = [];
      var values = [];

      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var pro = obj[prop].prop;

          if (obj[prop].type === 'comment') {
            continue;
          }

          if (props.indexOf(pro) === -1) {
            props.push(pro);
            values.push({prop: pro, val:obj[prop].value});
          } else {
            var lookup = {};

            for (var i = 0, len = values.length; i < len; i++) {
              lookup[values[i].prop] = values[i].val;
            }

            if (lookup[pro].search('px') === -1 && obj[prop].value.search('rem') === -1 ||
            lookup[pro].search('rem') === -1 && obj[prop].value.search('px') === -1) {
              hasFallback.push(pro);
            }
          }
        }
      }

      return hasFallback;
    }

    /**
     * Max digit function
     */
    Number.prototype.maxDecimals = function(max) {
      if (!max || max > 20) { return this; }

      var returnValue = (Math.round(this + 'e+' + max)  + 'e-' + max);

      if (isNaN(returnValue)) {
        return this;
      }

      return +returnValue;
    };

    /**
     * Iterate over all specified file groups.
     */
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
        var dest = f.dest || filepath;
        var input = grunt.file.read(filepath);
        var output = pxToRem(input, filepath, dest);

        grunt.file.write(dest, output.css);
        grunt.log.writeln('File ' + chalk.cyan(dest) + ' created.');

        if (output.map) {
          grunt.file.write(dest + '.map', output.map.toString());
          grunt.log.writeln('File ' + chalk.cyan(dest + '.map') + ' created (source map).');
        }
      });
    });
  });
};
