import { Middleware } from "koa";

import Joi from "joi";

export function getValidateBodyMw(schema: typeof Joi) : Middleware;
export function getValidateQueryMw(schema: typeof Joi) : Middleware;
export function getValidateParamsMw(schema: typeof Joi) : Middleware;
export function getValidateAllMw(schema: typeof Joi) : Middleware;
export { Joi };