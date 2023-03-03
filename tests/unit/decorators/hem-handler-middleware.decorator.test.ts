import { HemHandlerMiddlewareDecorator } from '../../../src';
import { NormalHandler } from '../fixtures/normal-handler';

test('should produce response when process call', () => {
  const middleware = new HemHandlerMiddlewareDecorator(new NormalHandler());
  expect(middleware.process(jest.fn(), jest.fn(), jest.fn())).toEqual('foo');
});
