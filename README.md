# grunt-px-to-rem

> Convert px to rem in css files with optional fallback to px.

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

#### options.fallback_existing_rem
Type: `bool`
Default value: `false`

Create px fallback for existing rem units. (options.fallback needs to be true)

#### options.ignore
Type: `array`
Default value: `[]`

Array of properties that px-to-rem should ignore. Ex: ['border-left','border-top']

#### options.max_decimals
Type: `Int`
Default value: `20`

Set max decimals on rem values.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  px_to_rem: {
    dist: {
      options: {
        base: 16,
        fallback: false,
        fallback_existing_rem: false,
        ignore: []
      },
      files: {
        'dest/style.css': ['src/style.css']
      }
    }
  }
});
```

#### CSS usage

```css
div {
  font-size: 16px; // Converts to rem
  border-left: 1pxi solid #000000; // Returns 1px (pxi = px important)
}
```