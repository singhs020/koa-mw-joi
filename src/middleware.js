const assert = require("assert");
const Joi = require("joi");

const ValidationType = {
  query: "query",
  body: "body",
  params: "params",
  all: "all",
};

function getMiddleware(schema, validationType = ValidationType.body) {
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
        data = {
          query: ctx.query,
          params: ctx.params,
          body: ctx.request.body,
        };
      }
      await schema.validateAsync(data);
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
