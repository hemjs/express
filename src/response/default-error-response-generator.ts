import { isNil, isObject } from '@hemjs/notions';
import type { ErrorResponseGenerator } from '../types';

export class DefaultErrorResponseGenerator implements ErrorResponseGenerator {
  reply(response: any, body: any, statusCode?: number) {
    if (statusCode) {
      response.status(statusCode);
    }
    if (isNil(body)) {
      return response.send();
    }
    return isObject(body) ? response.json(body) : response.send(String(body));
  }
}
