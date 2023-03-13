import { isNil, isObject } from '@hemjs/notions';
import { HemMiddleware } from '../types';

export class ErrorHandler implements HemMiddleware {
  public process(err: Error | any, req: any, res: any, next?: any) {
    const statusCode = this.getStatusCode(err);
    const body = {
      statusCode: statusCode,
      message: err.message,
    };
    this.reply(res, body, statusCode);
    console.log(err.message);
  }

  private reply(response: any, body: any, statusCode?: number) {
    if (statusCode) {
      response.status(statusCode);
    }
    if (isNil(body)) {
      return response.send();
    }
    return isObject(body) ? response.json(body) : response.send(String(body));
  }

  private getStatusCode(error: Error | any): number {
    let status = error.statusCode;

    if (!status || status < 400 || status >= 600) {
      status = 500;
    }

    return status;
  }
}
