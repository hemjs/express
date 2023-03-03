import type { HemHandler, HemMiddleware } from '../types';

export class HemHandlerMiddlewareDecorator implements HemMiddleware {
  constructor(private readonly handler: HemHandler) {}

  public process(req: any, res: any, next: any) {
    return this.handler.handle(req, res, next);
  }
}
