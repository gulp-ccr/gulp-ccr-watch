'use strict';

/**
 * Watch
 *   Watch source files of a bunch of specific tasks and run corresponding task when a file changes.
 *
 * zh_TW：
 *   watch 只要指定相依的 task 即可。
 *   然後自動由相依的 task 找出需要監控的對應檔案，並在檔案變動時，自動執行對應的 task。
 *
 * Recipe:
 *   watch
 *
 * Ingredients:
 *   browser-sync
 *   gulp.watch()
 *
 */
function watch() {
	var browserSync = require('browser-sync');
	var log = require('gulplog');

	var gulp = this.gulp;
	var config = this.config;
	var options = config.options || {};
	var tasks = this.tasks || [];

	if (config.run) {
		// run tasks before watch.
	}

	tasks.forEach(function (task) {
		var src;

		src = sources([], task);
		if (src.length) {
			log.info('watch', 'watching ' + JSON.stringify(src) + ' for ' + task.displayName);
			gulp.watch(src, options, task).on('change', browserSync.reload);
		} else {
			log.warn('watch', 'warning', task.displayName + ' has no `src` property.');
		}
	});

	// recursively add child task's sources.
	function sources(result, task) {
		var ret = result;

		if (task.config && task.config.src) {
			ret = ret.concat(task.config.src.globs);
		}
		if (task.tasks) {
			ret = task.tasks.reduce(sources);
		}
		return ret;
	}
}

watch.schema = {
	title: 'watch',
	description: 'Watch source files of specific tasks and run corresponding task when a file changes.',
	type: 'object',
	properties: {
		run: {
			description: 'Run tasks before watch.',
			type: 'boolean'
		},
		browserSync: {
			description: 'Options for browser-sync.',
			anyOf: [{
				description: 'Identifier of the browser-sync instance. This allows you share browser-sync instance among tasks.',
				type: 'string'
			}, {
				type: 'object',
				propertyes: {
					name: {
						description: 'Identifier of the browser-sync instance. This allows you share browser-sync instance among tasks.',
						type: 'string'
					},
					options: {
						description: 'See https://www.browsersync.io/docs/options/ for options.',
						type: 'object'
					}
				}
			}]
		},
		options: {
			properties: {
				persistent: {},
				ignored: {},
				ignoreInitial: {},
				followSymlinks: {},
				cwd: {},
				usePolling: {},
				interval: {},
				binaryInterval: {},
				useFsEvents: {},
				alwaysStat: {},
				depth: {},
				awaitWriteFinish: {},
				ignorePermissionErrors: {},
				atomic: {}
			}
		}
	}
};

watch.type = 'flow';

module.exports = watch;
