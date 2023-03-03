import {
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
} from '../../src';
import { InMemoryContainer } from './in-memory-container';

describe('MiddlewareProxy', () => {
  let originContainer: InMemoryContainer;
  let proxy: MiddlewareProxy;

  beforeEach(() => {
    originContainer = new InMemoryContainer();
    const container = new MiddlewareContainer(originContainer);
    const factory = new MiddlewareFactory(container);
    proxy = new MiddlewareProxy(factory);
  });

  afterEach(() => {
    originContainer.reset();
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
