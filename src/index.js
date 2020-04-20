const assert = require("assert");

const createMw = require("./middleware");

function getValidateBodyMw(schema) {
  assert(schema && schema.isJoi === true, "The joi schema is required.");
  return createMw(schema);
}

module.exports = {
  getValidateBodyMw
};
