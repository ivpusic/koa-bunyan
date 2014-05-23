'use strict';

var util = require('util');

module.exports = function (logger, opts) {
  opts = opts || {};

  var defaultLevel = opts.level || 'info';

  return function * (next) {
    var ctx = this;

    var done = function () {
      logger[defaultLevel](util.format('[RES] %s %s (%s)', ctx.method, ctx.originalUrl, ctx.status));
    };

    ctx.res.once('finish', done);
    ctx.res.once('close', done);

    logger[defaultLevel](util.format('[REQ] %s %s', ctx.method, ctx.url));

    yield next;
  };
};
