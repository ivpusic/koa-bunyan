'use strict';

const util = require('util');

module.exports = function (logger, opts) {
  opts = opts || {};

  const defaultLevel = opts.level || 'info';
  const requestTimeLevel = opts.timeLimit;

  return function (ctx, next) {
    const startTime = new Date().getTime();
    logger[defaultLevel](requestMessage(ctx, opts.headers));

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

function requestMessage (ctx, headersToLog) {
    const message = util.format('[REQ] %s %s', ctx.method, ctx.url);
    if (headersToLog) {
        const filteredHeaders = headersToLog.reduce((acc, cur) => {
            const key = cur.toLowerCase();
            acc[key] = ctx.headers[key];
            return acc;
        }, {});
        return message + ' headers ' + JSON.stringify(filteredHeaders);
    }
    return message;
}
