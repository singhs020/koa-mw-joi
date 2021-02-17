const { expect } = require("chai");
const Joi = require("joi");
const { stub } = require("sinon");

const getMiddleware = require("../src/middleware");

const schema = Joi.object().keys({
  "foo": Joi.string()
});
const validator = getMiddleware(schema);

const body = {
  "foo": "bar"
};
const invalidBody = {
  "foo": 1
};

const ctx = {
  "status": 0,
  "body": ""
};
ctx.request = { body };
const next = stub().resolves();

describe("The middleware", () => {
  describe("when a request needs a validation", () => {
    describe("and the request body is invalid", () => {
      before(() => {
        ctx.request.body = invalidBody;
      });

      after(() => {
        ctx.request.body = body;
        ctx.body = "";
        ctx.status = 0;
      });

      it("should return a response with 400 status code", async () => {
        await validator(ctx, next);
        expect(ctx.body).to.deep.equal({
          "error": [
            "\"foo\" must be a string"
          ],
          "message": "Bad Request"
        });
        expect(ctx.status).to.equal(400);
      });
    });

    describe("and the request body is valis", () => {

      after(() => {
        ctx.body = "";
        ctx.status = 0;
      });

      it("should not return a response with 400 status code", async () => {
        await validator(ctx, next);
        expect(ctx.body).to.equal("");
        expect(ctx.status).to.equal(0);
      });
    });
  });

  describe("when schema is not passed", () => {
    it("should throw an error", () => {
      expect(() => getMiddleware()).to.throw("A Joi schema is required to use the middleware.");
    });
  });
});