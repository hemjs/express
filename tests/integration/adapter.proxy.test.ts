import { Needle } from '@hemjs/needle';
import * as http from 'http';
import * as request from 'supertest';
import {
  ErrorHandler,
  ERROR_HANDLER,
  ExpressAdapter,
  ExpressModule,
} from '../../src';

describe('proxy', () => {
  let processStdoutWriteSpy: any;
  let adapter: ExpressAdapter;
  let server: http.Server;

  beforeEach(() => {
    processStdoutWriteSpy = jest.spyOn(process.stdout, 'write');
    const providers = new ExpressModule().register()?.['providers'] ?? [];
    const container = new Needle([
      ...providers,
      { provide: ERROR_HANDLER, useExisting: ErrorHandler.name },
    ]);
    adapter = container.get<ExpressAdapter>(ExpressAdapter.name);
    adapter.initHttpServer({});
    server = adapter.getHttpServer();
  });

  afterEach(async () => {
    processStdoutWriteSpy = jest.resetAllMocks();
    await adapter.close();
  });

  describe('without error', () => {
    it('should invoke error handler', async () => {
      adapter.get('/', (req: any, res: any, next: any) => res.send('value'));
      await request(server).get('/').expect(200, 'value');
      expect(processStdoutWriteSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('with error', () => {
    it('should invoke error handler', async () => {
      adapter.get('/', (req: any, res: any, next: any) => {
        throw new Error('Boom');
      });
      await request(server).get('/').expect(500, {
        statusCode: 500,
        message: 'Boom',
      });
      expect(processStdoutWriteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
