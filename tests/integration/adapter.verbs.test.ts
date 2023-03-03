import { Needle } from '@hemjs/needle';
import * as request from 'supertest';
import { ExpressAdapter, ExpressModule } from '../../src';

describe('HTTP Verbs', () => {
  let adapter: ExpressAdapter;

  beforeEach(() => {
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle(providers);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
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

  describe('.post()', () => {
    it('should support POST method', async () => {
      adapter.post('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).post('/').expect(200, 'value');
    });
  });

  describe('.head()', () => {
    it('should support HEAD method', async () => {
      adapter.head('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).head('/').expect(200);
    });
  });

  describe('.delete()', () => {
    it('should support DELETE method', async () => {
      adapter.delete('/', (req: any, res: any) => res.send('value'));
      await request(adapter.getHttpServer()).delete('/').expect(200, 'value');
    });
  });
});
