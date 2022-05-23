import { Middleware } from "koa";

import Joi from "joi";

export function getValidateBodyMw(schema: Joi) : Middleware;
export function getValidateQueryMw(schema: Joi) : Middleware;
export function getValidateParamsMw(schema: Joi) : Middleware;
export function getValidateAllMw(schema: Joi) : Middleware;
export { Joi };