const {expect} = require("chai");
const Joi = require("joi");

const {getValidateBodyMw} = require("../src");

const schema = Joi.string();

describe("The index", () => {
  describe("when schema is passed", () => {
    it("should return a async function", () => {
      const mw = getValidateBodyMw(schema);
      expect(typeof mw).to.equal("function");
    });
  });

  describe("when schema is not passed", () => {
    it("should throw an error", () => {
      expect(() => getValidateBodyMw()).to.throw("The joi schema is required.");
    });
  });
});