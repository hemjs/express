import * as express from 'express';
import { ExpressAdapter } from '../../src';

test('should return an instance of ExpressAdapter', () => {
  const adapter = new ExpressAdapter(express());
  expect(adapter).toBeInstanceOf(ExpressAdapter);
});
