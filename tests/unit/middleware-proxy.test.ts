import { MiddlewareFactory } from '../../src';
import { MiddlewareProxy } from '../../src/middleware-proxy';

describe('MiddlewareProxy', () => {
  let proxy: MiddlewareProxy;

  beforeEach(() => {
    const factory = new MiddlewareFactory();
    proxy = new MiddlewareProxy(factory);
  });

  describe('.bindHandler()', () => {
    it('should support single middleware', () => {
      const callable = (req: any, res: any): void => {};
      const handler = proxy.bindHandler(callable);
      expect(typeof handler[0] === 'function').toBeTruthy();
    });

    it('should support array of middleware', () => {
      const callable = (req: any, res: any): void => {};
      const handler = proxy.bindHandler([callable, callable]);
      expect(typeof handler[0] === 'function').toBeTruthy();
      expect(typeof handler[1] === 'function').toBeTruthy();
    });
  });
});
