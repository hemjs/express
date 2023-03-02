import { CallableErrorMiddlewareDecorator } from '../../src/decorators/callable-error-middleware.decorator';
import { CallableMiddlewareDecorator } from '../../src/decorators/callable-middleware.decorator';
import { MiddlewareFactory } from '../../src/middleware-factory';
import { NoopMiddleware } from './fixtures/noop-middleware';
import { NormalMiddleware } from './fixtures/normal-middleware';

describe('MiddlewareFactory', () => {
  let factory: MiddlewareFactory;

  beforeEach(() => {
    factory = new MiddlewareFactory();
  });

  it('should prepare middleware instance verbatim', () => {
    const middleware = new NormalMiddleware();
    expect(factory.prepare(middleware)).toEqual(middleware);
  });

  it('should prepare middleware class as middleware', () => {
    const middleware = factory.prepare(NormalMiddleware);
    expect(middleware).toBeInstanceOf(NormalMiddleware);
  });

  it('should prepare callable as middleware', () => {
    const callable = (req: any, res: any): void => {};
    const middleware = factory.prepare(callable);
    expect(middleware).toEqual(new CallableMiddlewareDecorator(callable));
  });

  it('should decorate callable as middleware', () => {
    const callable = (req: any, res: any): void => {};
    const middleware = factory.callable(callable);
    expect(middleware).toEqual(new CallableMiddlewareDecorator(callable));
  });

  it('should prepare callable as middleware (error)', () => {
    const callable = (err: any, req: any, res: any, next: any): void => {};
    const middleware = factory.prepare(callable);
    expect(middleware).toEqual(new CallableErrorMiddlewareDecorator(callable));
  });

  it('should decorate callable as middleware (error)', () => {
    const callable = (err: any, req: any, res: any, next: any): void => {};
    const middleware = factory.callable(callable);
    expect(middleware).toEqual(new CallableErrorMiddlewareDecorator(callable));
  });

  it('should prepare array middleware as middleware array', () => {
    const middleware1 = new NormalMiddleware();
    const middleware2 = new NormalMiddleware();
    const middleware = factory.prepare([middleware1, middleware2]);
    expect(middleware).toEqual([middleware1, middleware2]);
  });

  it('should pipeline array middleware as middleware array', () => {
    const middleware1 = new NormalMiddleware();
    const middleware2 = new NormalMiddleware();
    const middleware = factory.pipeline([middleware1, middleware2]);
    expect(middleware).toEqual([middleware1, middleware2]);
  });

  it('should reject noop class as middleware', () => {
    expect(() => factory.prepare(NoopMiddleware)).toThrow();
  });

  it('should reject number as middleware', () => {
    expect(() => factory.prepare(42)).toThrow();
  });

  it('should reject null as middleware', () => {
    expect(() => factory.prepare(null)).toThrow();
  });

  it('should reject Date as middleware', () => {
    expect(() => factory.prepare(new Date())).toThrow();
  });

  it('should reject boolean as middleware', () => {
    expect(() => factory.prepare(false)).toThrow();
  });
});
