import type { HemMiddleware } from '../../../src';

export class NormalMiddleware implements HemMiddleware {
  process(req: any, res: any, next: (error?: any) => void) {
    return 'foo';
  }
}
