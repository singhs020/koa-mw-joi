const assert = require("assert");
const Joi = require("joi");

const ValidationType = {
  query: "query",
  body: "body",
  params: "params",
  all: "all",
};

function getMiddleware({
  schema,
  validationType = ValidationType.body,
  options = {},
} = {}) {
  assert(
    schema && Joi.isSchema(schema) === true,
    "A Joi schema is required to use the middleware."
  );

  return async (ctx, next) => {
    try {
      let data = ctx.request.body;
      if (validationType === ValidationType.query) {
        data = ctx.query;
      } else if (validationType === ValidationType.params) {
        data = ctx.params;
      } else if (validationType === ValidationType.all) {
        data = {};
        if (ctx.query && Object.keys(ctx.query).length > 0) {
          data.query = ctx.query;
        }

        if (ctx.params && Object.keys(ctx.params).length > 0) {
          data.params = ctx.params;
        }

        if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
          data.body = ctx.request.body;
        }
      }
      const value = await schema.validateAsync(data, options);
      ctx.validatedInfo = {
        [validationType]: value
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: "Bad Request",
        error: error.details.map((item) => item.message),
      };
      return;
    }
    await next();
  };
}

module.exports = {
  getMiddleware,
  ValidationType,
};
