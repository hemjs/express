import { Needle } from '@hemjs/needle';
import * as request from 'supertest';
import { ExpressAdapter, ExpressModule } from '../../src';

describe('error', () => {
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

  describe('.setErrorHandler()', () => {
    it('should invoke error handler', async () => {
      adapter.get('/', (req: any, res: any, next: any) =>
        next(new Error('boom!')),
      );
      adapter.setErrorHandler((err: any, req: any, res: any, next: any) => {
        res.status(500).end(err.message);
      });
      await request(adapter.getHttpServer()).get('/').expect(500, 'boom!');
    });

    it('should invoke error handler when path', async () => {
      adapter.get('/api', (req: any, res: any, next: any) =>
        next(new Error('boom!')),
      );
      adapter.setErrorHandler(
        '/api',
        (err: any, req: any, res: any, next: any) => {
          res.status(500).end(err.message);
        },
      );
      await request(adapter.getHttpServer()).get('/api').expect(500, 'boom!');
    });
  });

  describe('.setNotFoundHandler()', () => {
    it('should invoke not-found handler', async () => {
      adapter.setNotFoundHandler((req: any, res: any, next: any) => {
        res.status(404).send('Not found');
      });
      await request(adapter.getHttpServer()).get('/').expect(404, 'Not found');
    });

    it('should invoke not-found handler when path', async () => {
      adapter.setNotFoundHandler('/api', (req: any, res: any, next: any) => {
        res.status(404).send('Not found');
      });
      await request(adapter.getHttpServer())
        .get('/api')
        .expect(404, 'Not found');
    });
  });
});