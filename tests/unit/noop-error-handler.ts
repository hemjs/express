import type { HemMiddleware } from '../../src';

export class NoopErrorHandler implements HemMiddleware {
  process(err: any, req: any, res: any, next?: any) {}
}
