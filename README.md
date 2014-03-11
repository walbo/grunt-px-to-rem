# grunt-px-to-rem

> Convert px to rem

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-px-to-rem --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-px-to-rem');
```

## The "px_to_rem" task

### Options

#### options.base
Type: `Int`
Default value: `16`

Base size

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  px_to_rem: {
    options: {
      base: 16
    },
    files: {
      'dest/style.css': ['src/style.css'],
    },
  },
});
```

## Release History
 * 2014-11-03   v0.1.3   Added option to keep px. Use ! to keep px value
 * 2014-27-02   v0.1.0   Init
