# koa-mw-joi [Work in progress]

Koa middleware for validation using Joi. It validates the body of the request using the schema provided while generating the middleware.

## How to use
```
const Koa = require("koa");
const getLogger = require("koa-mw-logger");

const app = Koa();

app.use(getLogger());
```

to use it in a handler
```
async function handler(ctx, next) {
  const logger = ctx.logger;
  logger.info({"message": "logging something"});
}
```

## Config
There is an option to pass in the config as per the following structure to define some properties of logger.

```
const Koa = require("koa");
const getLogger = require("koa-mw-logger");

const config = {
  "name": "test"
};

const app = Koa();

app.use(getLogger(config));
```

## Support or Contact
Having trouble with koa-mw-logger or have any questions? Please raise an issue.
