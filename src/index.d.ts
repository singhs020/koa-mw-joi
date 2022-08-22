import { Middleware } from "koa";

import Joi from "joi";

export function getValidateBodyMw(
  schema: Joi,
  options: Joi.AsyncValidationOptions = {}
): Middleware;
export function getValidateQueryMw(
  schema: Joi,
  options: Joi.AsyncValidationOptions = {}
): Middleware;
export function getValidateParamsMw(
  schema: Joi,
  options: Joi.AsyncValidationOptions = {}
): Middleware;
export function getValidateAllMw(
  schema: Joi,
  options: Joi.AsyncValidationOptions = {}
): Middleware;

export { Joi };
