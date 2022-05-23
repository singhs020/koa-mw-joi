const assert = require("assert");
const Joi = require("joi");

const {getMiddleware, ValidationType} = require("./middleware");

function getValidateBodyMw(schema) {
  assert(schema && (Joi.isSchema(schema) === true), "The joi schema is required.");
  return getMiddleware(schema);
}

function getValidateQueryMw(schema) {
  assert(schema && (Joi.isSchema(schema) === true), "The joi schema is required.");
  return getMiddleware(schema, ValidationType.query);
}

function getValidateParamsMw(schema) {
  assert(schema && (Joi.isSchema(schema) === true), "The joi schema is required.");
  return getMiddleware(schema, ValidationType.params);
}

function getValidateAllMw(schema) {
  assert(schema && (Joi.isSchema(schema) === true), "The joi schema is required.");
  return getMiddleware(schema, ValidationType.all);
}

module.exports = {
  getValidateBodyMw,
  getValidateQueryMw,
  getValidateParamsMw,
  getValidateAllMw,
  Joi
};
