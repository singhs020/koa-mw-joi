# koa-mw-joi

[![NPM](https://nodei.co/npm/koa-mw-joi.png?downloads=true)](https://www.npmjs.com/package/koa-mw-joi/)

Koa middleware for validation using Joi. It validates the body of the request using the schema provided while generating the middleware.

If the body failed to pass the validation, it will throw a 400 Error with the details in it.

## Functions Available
- getValidateBodyMw
- getValidateQueryMw
- getValidateParamsMw
- getValidateAllMw

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
### Joi Options
All the functions exported from this package supports Joi options to be passed to the validator function. The output result from Joi is also attached to the context at following key.

```
ctx.validatedInfo = {
  query: {}, // will be available if query validator is used
  body: {}, // will be available if body validator is used
  params: {}, // will be available if params validator is used
  all: {}, // will be available if all validator is used
};
```

This can be used as:

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

const options = {stripUnknown: true};

router.post("/", getValidateBodyMw(schema, options), (ctx, next) => {
  // in your handler logic

  console.log(ctx.validatedInfo.body);
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

### getValidateAllMw
this will generate an object for validation in following format

```
const data = {
  query: {},
  body: {},
  params: {}
}
```
If any one of query, params and body is not available on context, it will not add that into the final data object for validation.

Let's say the context doesnot have query, the final object will be in following shape.

```
const data = {
  body: {},
  params: {}
}
```

## Support or Contact
Having trouble with koa-mw-joi or have any questions? Please raise an issue.
