const assert = require("assert");
const Joi = require("joi");

const { getMiddleware, ValidationType } = require("./middleware");

function getValidateBodyMw(schema, options = {}) {
  assert(
    schema && Joi.isSchema(schema) === true,
    "The joi schema is required."
  );
  return getMiddleware({ schema, options });
}

function getValidateQueryMw(schema, options = {}) {
  assert(
    schema && Joi.isSchema(schema) === true,
    "The joi schema is required."
  );
  return getMiddleware({
    schema,
    validationType: ValidationType.query,
    options,
  });
}

function getValidateParamsMw(schema, options = {}) {
  assert(
    schema && Joi.isSchema(schema) === true,
    "The joi schema is required."
  );
  return getMiddleware({
    schema,
    validationType: ValidationType.params,
    options,
  });
}

function getValidateAllMw(schema, options = {}) {
  assert(
    schema && Joi.isSchema(schema) === true,
    "The joi schema is required."
  );
  return getMiddleware({
    schema,
    validationType: ValidationType.all,
    options,
  });
}

module.exports = {
  getValidateBodyMw,
  getValidateQueryMw,
  getValidateParamsMw,
  getValidateAllMw,
  Joi,
};
