import * as express from 'express';
import type { Container, Provider } from '@hemtypes/container';
import { MiddlewareFactory } from './middleware-factory';
import { ExpressAdapter } from './express-adapter';
import { MiddlewareContainer } from './middleware-container';
import { MiddlewareProxy } from './middleware-proxy';

export class ExpressModule {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: MiddlewareContainer.name,
          useFactory: (container: Container) => {
            return new MiddlewareContainer(container);
          },
        },
        {
          provide: MiddlewareFactory.name,
          useFactory: (container: Container) => {
            return new MiddlewareFactory(
              container.get<MiddlewareContainer>(MiddlewareContainer.name),
            );
          },
        },
        {
          provide: MiddlewareProxy.name,
          useFactory: (container: Container) => {
            return new MiddlewareProxy(container.get(MiddlewareFactory.name));
          },
        },
        {
          provide: ExpressAdapter.name,
          useFactory: (container: Container) => {
            return new ExpressAdapter(express());
          },
        },
      ],
    };
  }
}
