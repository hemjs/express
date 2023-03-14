import { getStatusCode } from '../../src';
import { CustomError } from './fixtures/custom-error';

describe('.getStatusCode()', () => {
  it('should return 500 when status code < 400', () => {
    const error = new CustomError('Internal server error', 200);
    expect(getStatusCode(error)).toEqual(500);
  });

  it('should return 500 when status code >= 600', () => {
    const error = new CustomError('Internal server error', 600);
    expect(getStatusCode(error)).toEqual(500);
  });

  it('should return verbatim when status code >= 400 && status code < 600', () => {
    const error = new CustomError('Unauthorized', 401);
    expect(getStatusCode(error)).toEqual(401);
  });
});
