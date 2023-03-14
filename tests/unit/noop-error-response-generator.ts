import type { ErrorResponseGenerator } from '../../src';

export class NoopErrorResponseGenerator implements ErrorResponseGenerator {
  reply(response: any, body: any, statusCode?: number | undefined) {}
}
