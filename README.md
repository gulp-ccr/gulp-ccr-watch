# gulp-ccr-watch
Watch source files of a bunch of specific tasks and run corresponding task when a file changes.
A cascading configurable gulp recipe for [gulp-chef](https://github.com/gulp-cookery/gulp-chef).

## Install
```bash
npm install gulp-ccr-watch
```
## Configuration
### options
See https://github.com/paulmillr/chokidar for options.

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
	watch: ['scripts', 'styles'],
	wpoll: {
		watch: {
			options: {
				usePolling: true
			},
			task: ['scripts', 'styles']
		}
	}
}
```