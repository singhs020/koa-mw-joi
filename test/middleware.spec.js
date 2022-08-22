const { expect } = require("chai");
const Joi = require("joi");
const { stub } = require("sinon");

const { getMiddleware, ValidationType } = require("../src/middleware");

const schema = Joi.object().keys({
  foo: Joi.string(),
});
const allSchema = Joi.object().keys({
  query: schema,
  body: schema,
  params: schema,
});
const validator = getMiddleware({ schema });
const queryValidator = getMiddleware({
  schema,
  validationType: ValidationType.query,
});
const paramsValidator = getMiddleware({
  schema,
  validationType: ValidationType.params,
});
const allValidator = getMiddleware({
  schema: allSchema,
  validationType: ValidationType.all,
});
const optionsValidator = getMiddleware({ schema, options: {stripUnknown: true} });

const body = {
  foo: "bar",
};
const invalidBody = {
  foo: 1,
};
const optionsBody = {
  foo: "bar",
  test: "bar"
};

const ctx = {
  status: 0,
  body: "",
  query: body,
  params: body,
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
          error: ['"foo" must be a string'],
          message: "Bad Request",
        });
        expect(ctx.status).to.equal(400);
      });
    });

    describe("and the query is invalid", () => {
      before(() => {
        ctx.query = invalidBody;
      });

      after(() => {
        ctx.query = body;
        ctx.body = "";
        ctx.status = 0;
      });

      it("should return a response with 400 status code", async () => {
        await queryValidator(ctx, next);
        expect(ctx.body).to.deep.equal({
          error: ['"foo" must be a string'],
          message: "Bad Request",
        });
        expect(ctx.status).to.equal(400);
      });
    });

    describe("and the params are invalid", () => {
      before(() => {
        ctx.params = invalidBody;
      });

      after(() => {
        ctx.params = body;
        ctx.body = "";
        ctx.status = 0;
      });

      it("should return a response with 400 status code", async () => {
        await paramsValidator(ctx, next);
        expect(ctx.body).to.deep.equal({
          error: ['"foo" must be a string'],
          message: "Bad Request",
        });
        expect(ctx.status).to.equal(400);
      });
    });

    describe("and the request body is valid", () => {
      after(() => {
        ctx.body = "";
        ctx.status = 0;
      });

      it("should not return approriate response", async () => {
        await validator(ctx, next);
        expect(ctx.body).to.equal("");
        expect(ctx.status).to.equal(0);
      });
    });

    describe("and the query is valid", () => {
      after(() => {
        ctx.body = "";
        ctx.status = 0;
      });

      it("should not return appropriate response", async () => {
        await queryValidator(ctx, next);
        expect(ctx.body).to.equal("");
        expect(ctx.status).to.equal(0);
      });
    });

    describe("when everything needs a validation", () => {
      after(() => {
        ctx.body = "";
        ctx.status = 0;
      });

      it("should return appropriate response", async () => {
        await allValidator(ctx, next);
        expect(ctx.body).to.equal("");
        expect(ctx.status).to.equal(0);
      });
    });

    describe("when options are passed", () => {
      before(() => {
        ctx.request.body = optionsBody;
      });

      after(() => {
        ctx.body = "";
        ctx.status = 0;
        ctx.request.body = body;
      });

      it("should return appropriate response", async () => {
        await optionsValidator(ctx, next);
        expect(ctx.body).to.equal("");
        expect(ctx.status).to.equal(0);
        expect(ctx.validatedInfo.body).to.deep.equal(body);
      });
    });
  });

  describe("when schema is not passed", () => {
    it("should throw an error", () => {
      expect(() => getMiddleware()).to.throw(
        "A Joi schema is required to use the middleware."
      );
    });
  });
});
