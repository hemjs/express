import * as express from 'express';
import type { Container, Provider } from '@hemtypes/container';
import { MiddlewareFactory } from './middleware-factory';
import { ExpressAdapter } from './express-adapter';
import { MiddlewareContainer } from './middleware-container';
import { MiddlewareProxy } from './middleware-proxy';
import { ErrorHandler } from './middleware/error-handler';
import { ERROR_HANDLER, ERROR_RESPONSE_GENERATOR } from './constants';
import type { ErrorResponseGenerator, HemMiddleware } from './types';
import { DefaultErrorResponseGenerator } from './response';

export class ExpressModule {
  register(): { providers: Provider[] } {
    return {
      providers: [
        {
          provide: DefaultErrorResponseGenerator.name,
          useClass: DefaultErrorResponseGenerator,
        },
        {
          provide: ErrorHandler.name,
          useFactory: (container: Container) => {
            const generator = container.has(ERROR_RESPONSE_GENERATOR)
              ? container.get<ErrorResponseGenerator>(ERROR_RESPONSE_GENERATOR)
              : container.get<ErrorResponseGenerator>(
                  DefaultErrorResponseGenerator.name,
                );
            return new ErrorHandler(generator);
          },
        },
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
            const errorHandler = container.has(ERROR_HANDLER)
              ? container.get<HemMiddleware>(ERROR_HANDLER)
              : undefined;
            return new MiddlewareProxy(
              container.get(MiddlewareFactory.name),
              errorHandler,
            );
          },
        },
        {
          provide: ExpressAdapter.name,
          useFactory: (container: Container) => {
            return new ExpressAdapter(
              express(),
              container.get<MiddlewareProxy>(MiddlewareProxy.name),
            );
          },
        },
      ],
    };
  }
}
