'use strict';

var util = require('util');

module.exports = function (logger, opts) {
  opts = opts || {};

  var defaultLevel = opts.level || 'info';
  var requestTimeLevel = opts.timeLimit;

  return function * (next) {
    var startTime = new Date().getTime();
    var ctx = this;
    logger[defaultLevel](util.format('[REQ] %s %s', ctx.method, ctx.url));

    var done = function () {
      var requestTime = new Date().getTime() - startTime;
      var localLevel = defaultLevel;

      if (requestTimeLevel && requestTime > requestTimeLevel) {
        localLevel = 'warn';
      }
      logger[localLevel](util.format('[RES] %s %s (%s) took %s ms', ctx.method, ctx.originalUrl, ctx.status, requestTime));
    };

    ctx.res.once('finish', done);
    ctx.res.once('close', done);


    yield next;
  };
};
