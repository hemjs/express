import { HemHandlerMiddleware } from '../../../src';
import { NormalHandler } from '../fixtures/normal-handler';

test('should produce response when process call', () => {
  const middleware = new HemHandlerMiddleware(new NormalHandler());
  expect(middleware.process(jest.fn(), jest.fn(), jest.fn())).toEqual('foo');
});
