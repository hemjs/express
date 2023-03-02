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

export interface HemMiddleware<TRequest = any, TResponse = any> {
  process(err: any, req: TRequest, res: TResponse, next?: NextFunction): any;
  process(req: TRequest, res: TResponse, next?: NextFunction): any;
}

export type Handler = ErrorHandler | RequestHandler;

export type HandlerArgument = Handler | Handler[];
