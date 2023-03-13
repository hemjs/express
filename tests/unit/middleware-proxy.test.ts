import {
  HemMiddleware,
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
} from '../../src';
import { InMemoryContainer } from './in-memory-container';
import { NoopErrorHandler } from './noop-error-handler';

const noop = () => {};

describe('MiddlewareProxy', () => {
  let errorHandler: HemMiddleware;
  let originContainer: InMemoryContainer;
  let middlewareProxy: MiddlewareProxy;

  beforeEach(() => {
    errorHandler = new NoopErrorHandler();
    originContainer = new InMemoryContainer();
    const container = new MiddlewareContainer(originContainer);
    const factory = new MiddlewareFactory(container);
    middlewareProxy = new MiddlewareProxy(factory, errorHandler);
  });

  afterEach(() => {
    originContainer.reset();
  });

  describe('.createProxy', () => {
    it('should method return thunk', () => {
      const proxy = middlewareProxy.createProxy(() => {}, errorHandler);
      expect(typeof proxy === 'function').toBeTruthy();
    });

    it('should method encapsulate callback passed as argument', () => {
      const spy = jest.spyOn(errorHandler, 'process');
      const proxy = middlewareProxy.createProxy((req, res, next) => {
        throw new Error();
      }, errorHandler);
      proxy(null, null, noop);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(new Error(), null, null, noop);
    });

    it('should method encapsulate async callback passed as argument', (done) => {
      const spy = jest.spyOn(errorHandler, 'process');
      const proxy = middlewareProxy.createProxy(async (req, res, next) => {
        throw new Error();
      }, errorHandler);
      proxy(null, null, noop);

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Error(), null, null, noop);
        done();
      }, 0);
    });
  });

  describe('.bindHandler()', () => {
    it('should support single middleware', () => {
      const callable = (req: any, res: any): void => {};
      const handler = middlewareProxy.bindHandler(callable);
      expect(typeof handler[0] === 'function').toBeTruthy();
    });

    it('should support array of middleware', () => {
      const callable = (req: any, res: any): void => {};
      const handler = middlewareProxy.bindHandler([callable, callable]);
      expect(typeof handler[0] === 'function').toBeTruthy();
      expect(typeof handler[1] === 'function').toBeTruthy();
    });
  });
});
