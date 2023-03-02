import { Needle } from '@hemjs/needle';
import * as express from 'express';
import * as request from 'supertest';
import { ExpressAdapter, ExpressModule } from '../../src';

describe('.getInstance()', () => {
  let instance: express.Application;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    const adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    instance = adapter.getInstance();
  });

  it('should support express application instance', async () => {
    instance.get('/', (req: any, res: any) => res.send('value'));
    await request(instance).get('/').expect(200, 'value');
  });
});
