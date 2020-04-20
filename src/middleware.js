function getMiddleware(schema) {

  return async (ctx, next) => {
    try {
      await schema.validateAsync(ctx.request.body);
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
