const assert = require("assert");
const Joi = require("joi");

function getMiddleware(schema, validateQuery = false) {
  assert(schema && (Joi.isSchema(schema) === true), "A Joi schema is required to use the middleware.");

  return async (ctx, next) => {
    try {
      const data = validateQuery === true ? ctx.query : ctx.request.body;
      await schema.validateAsync(data);
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        "message": "Bad Request",
        "error": error.details.map((item) => item.message)
      };
      return;
    }
    await next();
  };
}

module.exports = getMiddleware;
