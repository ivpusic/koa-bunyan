const test = require('tape');
const logging = require('../lib/koa-bunyan');

test('it logs the request', assert => {
    const messages = [];
    const logger = {
        info: (message) => {
            messages.push(message);
        }
    };
    const log = logging(logger);
    const ctx = context();
    log(ctx, () => {
        assert.equal(messages.length, 2);
        assert.equal(messages[0], '[REQ] GET /test', 'logs request');
        assert.equal(messages[1], '[RES] GET /test (200) took 0 ms', 'logs response');
        assert.end();
    });
});

test('it logs requested headers', assert => {
    const messages = [];
    const logger = {
        info: (message) => {
            messages.push(message);
        }
    };
    const log = logging(logger, {headers: ['Accept-Language']});
    const ctx = context({
        'accept-language': 'en-GB', 'accept': 'application/json'
    });

    log(ctx, () => {
        assert.equal(
            messages[0],
            '[REQ] GET /test headers {"accept-language":"en-GB"}',
            'logs headers'
        );
        assert.end();
    });
});

function context(headers) {
    const ctx = {
        res: {},
        headers
    };
    ctx.method = 'GET';
    ctx.url = '/test';
    ctx.status = 200;
    ctx.originalUrl = '/test';
    ctx.res.once = (event, fn) => {
        if (event === 'finish') {
            fn();
        }
    };
    return ctx;
}
