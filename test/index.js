/* eslint consistent-this: 0 */
'use strict';

var test = require('mocha-cases');

var watch = require('../');

var context = {
	gulp: null,
	config: null,
	stream: null
};

var cases = {
	'should ...': {
		value: {
		},
		expected: {
		}
	}
};

function done(err, result) {
}

function runner(value, options) {
	var ctx;

	ctx = context;
	ctx.config = value.config;
	return watch.call(ctx, done);
}

describe('watch()', function () {
	test(cases, runner);
});
