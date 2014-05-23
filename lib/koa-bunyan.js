'use strict';

var util = require('util');

module.exports = function (logger, opts) {
	opts = opts || {};

	var defaultLevel = opts.level || 'info';

	return function * (next) {
		logger[defaultLevel](util.format('%s %s', this.method, this.url));

		yield next;
	};
};