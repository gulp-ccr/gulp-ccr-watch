'use strict';

/**
 * Watch
 *   Watch source files of specific tasks and run corresponding task when a file changes.
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

	tasks.forEach(function (task) {
		var src;

		src = sources([], task);
		if (src.length) {
			log.info('watch', 'watching ' + JSON.stringify(src) + ' for ' + task.displayName);
			gulp.watch(src, options, task).on('all', browserSync.reload);
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
				persistent: {
					description: 'Indicates whether the process should continue to run as long as files are being watched.',
					type: 'boolean',
					default: true
				},
				ignored: {
					description: 'Defines files/paths to be ignored. The whole relative or absolute path is tested, not just filename.',
					type: 'array',
					items: {
						type: 'string'
					}
				},
				ignoreInitial: {
					description: 'If set to false then add/addDir events are also emitted for matching paths while instantiating the watching as chokidar discovers these file paths (before the ready event).',
					type: 'boolean',
					default: false
				},
				followSymlinks: {
					description: "When false, only the symlinks themselves will be watched for changes instead of following the link references and bubbling events through the link's path.",
					type: 'boolean',
					default: true
				},
				cwd: {
					description: 'The base directory from which watch paths are to be derived. Paths emitted with events will be relative to this.',
					type: 'string'
				},
				usePolling: {
					description: 'Whether to use fs.watchFile (backed by polling), or fs.watch. If polling leads to high CPU utilization, consider setting this to false. It is typically necessary to set this to true to successfully watch files over a network, and it may be necessary to successfully watch files in other non-standard situations. Setting to true explicitly on OS X overrides the useFsEvents default.',
					type: 'boolean',
					default: false
				},
				interval: {
					description: 'Interval of file system polling. Polling-specific setting (effective when usePolling: true).',
					type: 'integer',
					default: 100
				},
				binaryInterval: {
					description: 'Interval of file system polling for binary files. Polling-specific setting (effective when usePolling: true).',
					type: 'integer',
					default: 300
				},
				useFsEvents: {
					description: 'Whether to use the fsevents watching interface if available. When set to true explicitly and fsevents is available this supercedes the usePolling setting. When set to false on OS X, usePolling: true becomes the default.',
					type: 'boolean'
				},
				alwaysStat: {
					description: "If relying upon the fs.Stats object that may get passed with `add`, `addDir`, and `change` events, set this to true to ensure it is provided even in cases where it wasn't already available from the underlying watch events.",
					type: 'boolean',
					default: false
				},
				depth: {
					description: 'If set, limits how many levels of subdirectories will be traversed.',
					type: 'integer'
				},
				awaitWriteFinish: {
					description: 'In some cases, especially when watching for large files there will be a need to wait for the write operation to finish before responding to a file creation or modification. Setting awaitWriteFinish to true (or a truthy value) will poll file size, holding its add and change events until the size does not change for a configurable amount of time.',
					anyOf: [{
						type: 'boolean',
						default: false
					}, {
						type: 'object',
						properties: {
							stabilityThreshold: {
								description: 'Amount of time in milliseconds for a file size to remain constant before emitting its event.',
								type: 'integer',
								default: 2000
							},
							pollInterval: {
								description: 'File size polling interval.',
								type: 'integer',
								default: 100
							}
						}
					}]
				},
				ignorePermissionErrors: {
					description: "Indicates whether to watch files that don't have read permissions if possible. If watching fails due to EPERM or EACCES with this set to true, the errors will be suppressed silently.",
					type: 'boolean',
					default: false
				},
				atomic: {
					description: 'Automatically filters out artifacts that occur when using editors that use "atomic writes" instead of writing directly to the source file. (default: true if useFsEvents and usePolling are false.)',
					type: 'boolean',
					default: false
				}
			}
		}
	}
};

watch.type = 'flow';

module.exports = watch;
