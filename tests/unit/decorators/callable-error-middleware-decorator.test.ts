import { CallableErrorMiddlewareDecorator } from '../../../src/decorators/callable-error-middleware.decorator';

describe('CallableErrorMiddlewareDecorator', () => {
  it('should produce response when process call', () => {
    const middleware = (err: any, req: any, res: any, next: any): string =>
      'foo';
    const decorator = new CallableErrorMiddlewareDecorator(middleware);
    expect(
      decorator.process(jest.fn(), jest.fn(), jest.fn(), jest.fn()),
    ).toEqual('foo');
  });
});
