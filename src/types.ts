import { Type } from '@hemtypes/core';

export type PathArgument = string | RegExp | (string | RegExp)[];

export type NextFunction = (err?: any) => void;

export type ErrorHandler<TRequest = any, TResponse = any> = (
  err: any,
  req: TRequest,
  res: TResponse,
  next?: NextFunction,
) => any;

export type RequestHandler<TRequest = any, TResponse = any> = (
  req: TRequest,
  res: TResponse,
  next?: NextFunction,
) => any;

export interface HemHandler<TRequest = any, TResponse = any> {
  handle(req: TRequest, res: TResponse, next?: Function): any;
}

export interface HemMiddleware<TRequest = any, TResponse = any> {
  process(err: any, req: TRequest, res: TResponse, next?: NextFunction): any;
  process(req: TRequest, res: TResponse, next?: NextFunction): any;
}

export type Handler =
  | ErrorHandler
  | RequestHandler
  | HemMiddleware
  | HemHandler
  | Type<any>
  | Function
  | string
  | Symbol;

export type HandlerArgument = Handler | Handler[];

export interface ServeStaticOptions {
  dotfiles?: string;
  etag?: boolean;
  extensions?: string[];
  fallthrough?: boolean;
  immutable?: boolean;
  index?: boolean | string | string[];
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: any, path: string, stat: any) => any;
  prefix?: string;
}
