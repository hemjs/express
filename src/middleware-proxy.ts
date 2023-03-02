import type { MiddlewareFactory } from './middleware-factory';
import type { HandlerArgument } from './types';

export class MiddlewareProxy {
  constructor(private readonly factory: MiddlewareFactory) {}

  public bindHandler(handler: HandlerArgument) {
    let middleware = this.factory.prepare(handler);
    if (!Array.isArray(middleware)) {
      middleware = [middleware];
    }
    return middleware.map((mid: any) => {
      return mid.process.bind(mid);
    });
  }
}
