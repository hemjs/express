import * as express from 'express';
import * as request from 'supertest';
import { ExpressAdapter } from '../../src';

describe('HTTP Verbs', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    adapter = new ExpressAdapter(express());
    adapter.initHttpServer({});
  });

  afterEach(async () => {
    await adapter.close();
  });

  describe('.get()', () => {
    it('should support GET method', async () => {
      adapter.get('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).get('/').expect(200, 'value');
    });
  });
});
