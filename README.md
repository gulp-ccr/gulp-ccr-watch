# gulp-ccr-watch
Watch source files of specific tasks and run corresponding task when a file changes.
A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install
```bash
npm install gulp-ccr-watch
```
## Configuration
File watching is provided by the [chokidar](https://github.com/paulmillr/chokidar) module. Please report any file watching problems directly to its [issue tracker](https://github.com/paulmillr/chokidar/issues).

### options
Options that are passed to chokidar. See [chokidar's API](https://github.com/paulmillr/chokidar#api) for options.

### task
Tasks to take care of.

## Configuration Example
```javascript
{
    scripts: {
        src: '**/*.js'
        task: function (done) {}
    },
    styles: {
        src: '**/*.css',
        task: function (done) {}
    },
    build: ['scripts', 'styles'],
    watch: ['scripts', 'styles'],
    build_watch: {
        description: 'build and then watch',
        series: ['build', 'watch'],
    },
    with_options: {
        watch: {
            options: {
                usePolling: true
            },
            task: ['scripts', 'styles']
        }
    }
}
```
