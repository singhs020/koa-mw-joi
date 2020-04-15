const assert = require("assert");

const createMw = require("./middleware");

function getMw(schema) {
  assert(schema && schema.isJoi === true, "The joi schema is required.");
  return createMw(schema);
}

module.exports = getMw;
