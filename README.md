koa-bunyan
==========

Using node-bunyan as koa logging middleware

# Installation

```
npm install koa-bunyan
```

## Example
```Javascript
var koaLogger = require('koa-bunyan');

var koa = require('koa');
var app = koa();

var bunyan = require('bunyan');
// setup you logger instance
var log = bunyan.createLogger({name: "myapp"});

app.use(koaLogger(log.logger, {
    // which level you want to use for logging?
    // default is info
    level: 'debug'
}));

// then start server
// let we say... node app.js | ./node_modules/bunyan/bin/bunyan -o short

// result
18:29:10.520Z  INFO myapp: [RES] GET /auth/restore (204)
18:29:10.583Z  INFO myapp: [REQ] GET /api/products
18:29:10.590Z  INFO myapp: [REQ] GET /api/categories
18:29:10.620Z  INFO myapp: [RES] GET /api/categories (200)
18:29:10.620Z  INFO myapp: [RES] GET /api/products (200)
18:29:10.689Z  INFO myapp: [REQ] GET /api/categories/535c4375bcbcc794660b6c1d
18:29:10.694Z  INFO myapp: [RES] GET /api/categories/535c4375bcbcc794660b6c1d (200)
18:29:10.771Z  INFO myapp: [REQ] GET /api/categories/535c437abcbcc794660b6c1e
18:29:10.774Z  INFO myapp: [RES] GET /api/categories/535c437abcbcc794660b6c1e (200)
18:29:10.902Z  INFO myapp: [REQ] GET /api/users/1
```

Logs also can go to somewhere else. It depends on you passed logger configuration. 
For more details how to configure bunyan look at [node-bunyan](https://github.com/trentm/node-bunyan)

# License
**MIT**
