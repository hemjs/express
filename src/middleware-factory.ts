import { isFunction, isString, isSymbol, isUndefined } from '@hemjs/notions';
import type { Type } from '@hemtypes/core';
import { CallableErrorMiddlewareDecorator } from './decorators/callable-error-middleware.decorator';
import { CallableMiddlewareDecorator } from './decorators/callable-middleware.decorator';
import type { MiddlewareContainer } from './middleware-container';
import type { HemMiddleware } from './types';

export class MiddlewareFactory {
  constructor(private readonly container: MiddlewareContainer) {}

  public prepare(middleware: any): HemMiddleware | HemMiddleware[] {
    if (Array.isArray(middleware)) {
      return this.pipeline(middleware);
    }

    if (middleware?.process) {
      return middleware;
    }

    if (this.isMiddlewareClass(middleware)) {
      const instance = new middleware();

      if (isUndefined(instance.process)) {
        throw new Error('Invalid middleware');
      }

      return instance;
    }

    if (isFunction(middleware)) {
      return this.callable(middleware);
    }

    if (!isString(middleware) && !isSymbol(middleware)) {
      throw new Error('Invalid middleware');
    }

    return this.lazy(middleware);
  }

  public callable(middleware: Function): HemMiddleware {
    if (middleware.length > 3) {
      return new CallableErrorMiddlewareDecorator(middleware);
    }
    return new CallableMiddlewareDecorator(middleware);
  }

  public lazy(middleware: string | symbol): HemMiddleware {
    return this.container.get<HemMiddleware>(middleware);
  }

  public pipeline(middleware: any[]): HemMiddleware[] {
    return middleware.map((mid) => this.prepare(mid)) as HemMiddleware[];
  }

  private isMiddlewareClass(middleware: any): middleware is Type<any> {
    const middlewareStr = middleware.toString();
    if (middlewareStr.substring(0, 5) === 'class') {
      return true;
    }
    return false;
  }
}
