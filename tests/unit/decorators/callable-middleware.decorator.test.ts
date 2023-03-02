import { CallableMiddlewareDecorator } from '../../../src/decorators/callable-middleware.decorator';

test('should produce response when process call', () => {
  const middleware = (req: any, res: any): string => 'foo';
  const decorator = new CallableMiddlewareDecorator(middleware);
  expect(decorator.process(jest.fn(), jest.fn(), jest.fn())).toEqual('foo');
});
