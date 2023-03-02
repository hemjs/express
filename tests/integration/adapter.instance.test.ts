import * as express from 'express';
import * as request from 'supertest';
import { ExpressAdapter } from '../../src';

describe('Express Application', () => {
  let instance: express.Application;

  beforeEach(() => {
    const adapter = new ExpressAdapter(express());
    instance = adapter.getInstance();
  });

  it('should support express application', async () => {
    instance.get('/', (req: any, res: any) => res.send('value'));
    await request(instance).get('/').expect(200, 'value');
  });
});
