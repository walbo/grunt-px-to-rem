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

### Overview
In your project's Gruntfile, add a section named `px_to_rem` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  px_to_rem: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

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
    options: {},
    files: {
      'dest/style.css': ['style.css'],
    },
  },
});
```

## Release History
_(Nothing yet)_
