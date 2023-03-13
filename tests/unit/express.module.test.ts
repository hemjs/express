import { Provider } from '@hemtypes/container';
import {
  ErrorHandler,
  ExpressAdapter,
  ExpressModule,
  MiddlewareContainer,
  MiddlewareFactory,
  MiddlewareProxy,
} from '../../src';

describe('ExpressModule', () => {
  let providers: Provider[];

  beforeEach(() => {
    providers = new ExpressModule().register()?.['providers'] ?? [];
  });

  it('should define expected providers', () => {
    expect(providers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ provide: ErrorHandler.name }),
      ]),
    );
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
