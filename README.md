# koa-mw-joi

[![NPM](https://nodei.co/npm/koa-mw-joi.png?downloads=true)](https://www.npmjs.com/package/koa-mw-joi/)

Koa middleware for validation using Joi. It validates the body of the request using the schema provided while generating the middleware.

If the body failed to pass the validation, it will throw a 400 Error with the details in it.

## How to use
```
const Koa = require("koa");
const {getValidateBodyMw} = require("koa-mw-joi");
const Router = require("@koa/router");
const Joi = require(@hapi/joi);

const app = Koa();

const schema = Joi.object().keys({
  "foo": Joi.string().required()
});

const router = new Router();

router.post("/", getValidateBodyMw(schema), (ctx, next) => {
  // your handler logic here
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

## Support or Contact
Having trouble with koa-mw-joi or have any questions? Please raise an issue.
