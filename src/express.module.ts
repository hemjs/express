import * as express from 'express';
import type { Container, Provider } from '@hemtypes/container';
import { MiddlewareFactory } from './middleware-factory';
import { ExpressAdapter } from './express-adapter';

export class ExpressModule {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: MiddlewareFactory.name,
          useFactory: (container: Container) => {
            return new MiddlewareFactory();
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
