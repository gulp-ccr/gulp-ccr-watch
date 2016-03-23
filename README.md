# gulp-ccr-watch

Watch source files of specific tasks and their descendants and run corresponding task when a file changes.
A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install

```bash
$ npm install --save-dev gulp-chef gulp-ccr-watch
```

## Recipe

Do on Change

## Ingredients

* [browser-sync](https://github.com/BrowserSync/browser-sync)

* [gulp.watch()](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpwatchglob-opts-fn)

## Type

[Flow Controller](https://github.com/gulp-cookery/gulp-chef#writing-flow-controller)

## API

File watching is provided by the [chokidar](https://github.com/paulmillr/chokidar) module. Please report any file watching problems directly to its [issue tracker](https://github.com/paulmillr/chokidar/issues).

### config.options

Options that are passed to chokidar. See [chokidar's API](https://github.com/paulmillr/chokidar#api) for options.

### config.task

Tasks to take care of.

## Usage

``` javascript
var gulp = require('gulp');
var chef = require('gulp-chef');
var browserSync = require('browser-sync');

var meals = chef({
    src: 'app/',
    dest: 'dist/',
    markups: {
        src: '**/*.html',
        recipe: 'copy'
    },
    styles: {
        src: '**/*.less',
        plugin: 'gulp-less',
        spit: true
    },
    browserSync: {
        plugin: 'browser-sync',
        options: {
            server: '{{dest.path}}'
        }
    },
    watch: ['markups', 'styles'],
    build: { parallel: ['markups', 'styles'] },
    serve: ['build', 'browserSync', 'watch']
});

gulp.registry(meals);
```

This roughly do the same thing as the following normal gulp construct:

``` javascript
var gulp = require('gulp');
var less = require('gulp-less');
var sync = require('browser-sync');

var config = {
    dest: 'dist/',
    markups: 'app/**/*.html',
    styles: 'app/**/*.less'
};

function markups() {
    return gulp.src(config.markups)
        .pipe(gulp.dest(config.dest));
}

function styles() {
    return gulp.src(config.styles)
        .pipe(less())
        .pipe(gulp.dest(config.dest));
}

function browserSync() {
    sync({
        server: config.dest
    });
}

function watch() {
    gulp.watch(config.markups, markups)
        .on('change', sync.reload);
    gulp.watch(config.styles, styles)
        .on('change', sync.reload);
}

gulp.task(markups);
gulp.task(styles);
gulp.task(watch);
gulp.task('build', gulp.parallel(markups, styles));
gulp.task('serve', gulp.series('build', browserSync, watch));

```

## License
[MIT](https://opensource.org/licenses/MIT)

## Author
[Amobiz](https://github.com/amobiz)
