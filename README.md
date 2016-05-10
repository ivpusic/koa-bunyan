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
var logger = bunyan.createLogger({name: "myapp"});

app.use(koaLogger(logger, {
    // which level you want to use for logging?
    // default is info
    level: 'debug',
    // this is optional. Here you can provide request time in ms,
    // and all requests longer than specified time will have level 'warn'
    timeLimit: 100
}));

// then start server
// let we say... node app.js | ./node_modules/bunyan/bin/bunyan -o short

// result
22:36:34.043Z  WARN myapp: [RES] GET /api/products?top=5 (200) took 610 ms
22:36:34.172Z  INFO myapp: [REQ] GET /api/categories/535c4375bcbcc794660b6c1d
22:36:34.184Z  INFO myapp: [RES] GET /api/categories/535c4375bcbcc794660b6c1d (200) took 12 ms
22:36:34.375Z  INFO myapp: [REQ] GET /Screenshot%20from%202014-03-15%2011:17:20.png
22:36:34.378Z  INFO myapp: [REQ] GET /51a2035604cea64219.jpg
22:36:34.381Z  INFO myapp: [REQ] GET /matrix.jpg
22:36:34.394Z  INFO myapp: [REQ] GET /fonts/fontawesome-webfont.woff?v=4.1.0
22:36:34.400Z  INFO myapp: [RES] GET /Screenshot%20from%202014-03-15%2011:17:20.png (200) took 26 ms
22:36:34.406Z  INFO myapp: [RES] GET /fonts/fontawesome-webfont.woff?v=4.1.0 (200) took 12 ms
22:36:34.415Z  INFO myapp: [RES] GET /51a2035604cea64219.jpg (200) took 38 ms
22:36:34.417Z  INFO myapp: [RES] GET /matrix.jpg (200) took 36 ms
```

Logs also can go to somewhere else. It depends on you passed logger configuration. 
For more details how to configure bunyan look at [node-bunyan](https://github.com/trentm/node-bunyan)

## Note

Version >= 1.0.0 supports koa2, version < 1.0.0 supports koa1

# License
**MIT**
