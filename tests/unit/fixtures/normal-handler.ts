import type { HemHandler } from '../../../src';

export class NormalHandler implements HemHandler {
  handle(req: any, res: any) {
    return 'foo';
  }
}
