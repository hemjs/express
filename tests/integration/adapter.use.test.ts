import * as express from 'express';
import * as request from 'supertest';
import { ExpressAdapter } from '../../src';

describe('.use()', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    adapter = new ExpressAdapter(express());
    adapter.initHttpServer({});
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should behave like express', async () => {
    const calls: string[] = [];

    adapter.use((req: any, res: any, next: any) => {
      calls.push('one');
      next();
    });

    adapter.use((req: any, res: any, next: any) => {
      calls.push('two');
      next();
    });

    adapter.use((req: any, res: any) => {
      let buf = '';
      res.setHeader('Content-Type', 'application/json');
      req.setEncoding('utf8');
      req.on('data', (chunk: string) => {
        buf += chunk;
      });
      req.on('end', () => {
        res.end(buf);
      });
    });

    await request(adapter.getHttpServer())
      .get('/')
      .set('Content-Type', 'application/json')
      .send('{"foo":"bar"}')
      .expect('Content-Type', 'application/json')
      .expect(() => {
        expect(calls).toEqual(['one', 'two']);
      })
      .expect(200, '{"foo":"bar"}');
  });
});
