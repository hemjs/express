import { Provider } from '@hemtypes/container';
import { ExpressAdapter, MiddlewareFactory } from '../../src';
import { ExpressModule } from '../../src/express.module';
import { MiddlewareContainer } from '../../src/middleware-container';
import { MiddlewareProxy } from '../../src/middleware-proxy';

describe('ExpressAdapterModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new ExpressModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareContainer.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareFactory.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: MiddlewareProxy.name }),
      ]),
    );
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: ExpressAdapter.name }),
      ]),
    );
  });
});
