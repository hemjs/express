import { HemMiddleware } from '../types';

export class CallableErrorMiddlewareDecorator implements HemMiddleware {
  constructor(private readonly callable: Function) {}

  public process(err: any, req: any, res: any, next?: any) {
    return this.callable(err, req, res, next);
  }
}
