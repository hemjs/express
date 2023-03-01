import { ExpressAdapter } from '../src';

test('should return an instance of ExpressAdapter', () => {
  const adapter = new ExpressAdapter();
  expect(adapter).toBeInstanceOf(ExpressAdapter);
});
