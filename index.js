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
	var options = this.config.options || {};
	var tasks = this.tasks || [];

	tasks.forEach(function (task) {
		if (task.config && task.config.src) {
			log.info('watch', 'watching ' + JSON.stringify(task.config.src.globs) + ' for ' + task.displayName);
			gulp.watch(task.config.src.globs, options, task)
				.on('change', browserSync.reload);
		}
	});
}

watch.schema = {
	title: 'watch',
	description: 'Watch source files of a bunch of specific tasks and run corresponding task when a file changes.',
	type: 'object',
	properties: {
		options: {
			properties: {
				browserSync: {},
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
