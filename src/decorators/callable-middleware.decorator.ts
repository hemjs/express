import type { HemMiddleware } from '../types';

export class CallableMiddlewareDecorator implements HemMiddleware {
  constructor(private readonly callable: Function) {}

  public process(req: any, res: any, next: any) {
    return this.callable(req, res, next);
  }
}
