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

#### options.fallback
Type: `bool`
Default value: `false`

Keep initial px values for fallback to browser who doesn't support rem.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  px_to_rem: {
    options: {
      base: 16,
      fallback: false
    },
    files: {
      'dest/style.css': ['src/style.css'],
    },
  },
});
```

#### CSS usage

```css
p {
	font-size: 16px; // Coverts to rem
	border-left: !1px solid #000000; // Returns 1px because of the !
}
```

## Release History
 * 2014-12-03   v0.1.5   Added px fallback option
 * 2014-11-03   v0.1.4   Added option to keep px. Use ! to keep px value
 * 2014-27-02   v0.1.0   Init
