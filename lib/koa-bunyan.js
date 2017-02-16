'use strict';

const util = require('util');

module.exports = function (logger, opts) {
  opts = opts || {};

  const defaultLevel = opts.level || 'info';
  const requestTimeLevel = opts.timeLimit;

  return function (ctx, next) {
    const startTime = new Date().getTime();
    logger[defaultLevel](util.format('[REQ] %s %s', ctx.method, ctx.url));

    const done = function () {
      const requestTime = new Date().getTime() - startTime;
      let localLevel = defaultLevel;

      if (requestTimeLevel && requestTime > requestTimeLevel) {
        localLevel = 'warn';
      }
      logger[localLevel](util.format('[RES] %s %s (%s) took %s ms', ctx.method, ctx.originalUrl, ctx.status, requestTime));
    };

    ctx.res.once('finish', done);
    ctx.res.once('close', done);


    return next();
  };
};
