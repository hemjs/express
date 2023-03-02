import { Needle } from '@hemjs/needle';
import { ExpressAdapter, ExpressModule } from '../../src';

describe('.listen()', () => {
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

  it('should resolve with httpServer on success', () => {
    const server = adapter.listen(4444);
    expect(server).toEqual(adapter.getHttpServer());
  });
});
