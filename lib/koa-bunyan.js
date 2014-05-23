'use strict';

var util = require('util');

module.exports = function (logger, opts) {
  opts = opts || {};

  var defaultLevel = opts.level || 'info';

  return function * (next) {
    var ctx = this;

    var done = function (event) {
      ctx.res.removeListener('finish', onfinish);
      ctx.res.removeListener('close', onclose);
      logger[defaultLevel](util.format('[RES] %s %s (%s)', ctx.method, ctx.originalUrl, ctx.status));
    };

    var onfinish = done.bind(null, 'finish');
    var onclose = done.bind(null, 'close');

    ctx.res.once('finish', onfinish);
    ctx.res.once('close', onclose);

    logger[defaultLevel](util.format('[REQ] %s %s', ctx.method, ctx.url));

    yield next;
  };
};
