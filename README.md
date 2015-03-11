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
Type: `Boolean`
Default value: `false`

Keep initial px values for fallback to browser who doesn't support rem.

#### options.fallback_existing_rem
Type: `Boolean`
Default value: `false`

Create px fallback for existing rem units. (options.fallback needs to be true)

#### options.ignore
Type: `Array`
Default value: `[]`

Array of properties that px-to-rem should ignore. Ex: ['border-left','border-top']

#### options.map
Type: `Boolean|Object`
Default value: `false`

If the `map` option isn't defined or is set to `false`, px_to_rem will neither create nor update a sourcemap.

If `true` is specified, px_to_rem will try to find a sourcemap from a previous compilation step using an annotation comment (e.g. from Sass) and create a new sourcemap based on the found one (or just create a new inlined sourcemap). The created sourcemap can be either a separate file or an inlined map depending on what the previous sourcemap was.

You can gain more control over sourcemap generation by setting an object to the `map` option:

* `prev` (string or `false`): a path to a directory where a previous sourcemap is (e.g. `path/`). By default, px_to_rem will try to find a previous sourcemap using a path from the annotation comment (or using the annotation comment itself if the map is inlined). You can also set this option to `false` to delete the previous sourcemap.
* `inline` (boolean): whether a sourcemap will be inlined or not. By default, it will be the same as a previous sourcemap or inlined.
* `annotation` (boolean or string): set this option to `true` or `false` to enable or disable annotation comments. You can also overwrite an output sourcemap path using this option, e.g. `path/file.css.map` (by default, px_to_rem will save your sourcemap to a directory where you save CSS). This option requires `inline` to be `false` or undefined.
* `sourcesContent` (boolean): whether original contents (e.g. Sass sources) will be included to a sourcemap. By default, px_to_rem will add contents only for new sourcemaps or if a previous sourcemap has them.

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
        ignore: [],
        map: false
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