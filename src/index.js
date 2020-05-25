const assert = require("assert");
const Joi = require("@hapi/joi");

const createMw = require("./middleware");

function getValidateBodyMw(schema) {
  assert(schema && (Joi.isSchema(schema) === true), "The joi schema is required.");
  return createMw(schema);
}

module.exports = {
  getValidateBodyMw
};
