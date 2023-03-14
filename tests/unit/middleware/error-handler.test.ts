import { isNil, isObject } from '@hemjs/notions';
import { ErrorHandler, type ErrorResponseGenerator } from '../../../src';
import { NoopErrorResponseGenerator } from '../noop-error-response-generator';

describe('ErrorHandler', () => {
  let generator: ErrorResponseGenerator;
  let errorHandler: ErrorHandler;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let sendSpy: jest.SpyInstance;
  let response: any;

  beforeEach(() => {
    generator = new NoopErrorResponseGenerator();
    errorHandler = new ErrorHandler(generator);
    statusSpy = jest.fn();
    jsonSpy = jest.fn();
    sendSpy = jest.fn();
    response = {
      status: statusSpy,
      json: jsonSpy,
      send: sendSpy,
    };
    response.status.mockReturnValue(response);
    response.json.mockReturnValue(response);
    response.send.mockReturnValue(response);
  });

  describe('.process()', () => {
    beforeEach(() => {
      jest
        .spyOn(generator, 'reply')
        .mockImplementation(
          (responseRef: any, body: any, statusCode?: number) => {
            if (statusCode) {
              responseRef.status(statusCode);
            }
            if (isNil(body)) {
              return responseRef.send();
            }
            return isObject(body)
              ? responseRef.json(body)
              : responseRef.send(String(body));
          },
        );
    });

    it('should return status code and message when exception is unknown', () => {
      errorHandler.process(new Error(), null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: '', statusCode: 500 });
    });
  });
});
