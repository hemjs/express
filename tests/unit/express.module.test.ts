import { Provider } from '@hemtypes/container';
import {
  ExpressAdapter,
  ExpressModule,
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
} from '../../src';

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
