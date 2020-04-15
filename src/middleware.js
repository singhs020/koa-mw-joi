function getMiddleware(ctx, next) {
  ctx.status = 405;
  ctx.message = "In Progress";

  return next();
}

module.exports = getMiddleware;
