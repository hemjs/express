import { ErrorHandler } from '../../../src';
import { CustomError } from '../fixtures/custom-error';

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let sendSpy: jest.SpyInstance;
  let response: any;

  beforeEach(() => {
    errorHandler = new ErrorHandler();
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

  describe('.reply()', () => {
    it('should return send when nil as body', () => {
      errorHandler.reply(response, null);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith();
    });

    it('should return send when string as body', () => {
      const body = 'Internal server error';
      errorHandler.reply(response, body);
      expect(sendSpy).toHaveBeenCalledTimes(1);
      expect(sendSpy).toHaveBeenCalledWith(body);
    });

    it('should return json when object as body', () => {
      const body = { message: 'Internal server error' };
      errorHandler.reply(response, body);
      expect(jsonSpy).toHaveBeenCalledTimes(1);
      expect(jsonSpy).toHaveBeenCalledWith(body);
    });
  });

  describe('.process()', () => {
    it('should return status code and message when exception is unknown', () => {
      const error = new Error();
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: '',
        statusCode: 500,
      });
    });

    it('should return status code and message when status code < 400', () => {
      const error = new CustomError('Internal server error', 200);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Internal server error',
        statusCode: 500,
      });
    });

    it('should return status code and message when status code >= 600', () => {
      const error = new CustomError('Internal server error', 600);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Internal server error',
        statusCode: 500,
      });
    });

    it('should return status code and message', () => {
      const error = new CustomError('Unauthorized', 401);
      errorHandler.process(error, null, response, null);
      expect(statusSpy).toHaveBeenCalledWith(401);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Unauthorized',
        statusCode: 401,
      });
    });
  });
});
