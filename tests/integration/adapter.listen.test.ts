import * as express from 'express';
import { ExpressAdapter } from '../../src';

describe('.listen()', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    adapter = new ExpressAdapter(express());
    adapter.initHttpServer({});
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should resolve with httpServer on success', () => {
    const server = adapter.listen(4444);
    expect(server).toEqual(adapter.getHttpServer());
  });
});
