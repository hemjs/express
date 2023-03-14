import type { ErrorResponseGenerator, HemMiddleware } from '../types';
import { getStatusCode } from '../utils';

export class ErrorHandler implements HemMiddleware {
  constructor(private readonly generator: ErrorResponseGenerator) {}

  public process(err: Error | any, req: any, res: any, next?: any) {
    const statusCode = getStatusCode(err);
    const body = {
      statusCode: statusCode,
      message: err.message,
    };
    this.generator.reply(res, body, statusCode);
  }
}
