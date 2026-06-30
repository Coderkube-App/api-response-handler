const { test, describe } = require('node:test');
const assert = require('node:assert');
const ApiResponse = require('../dist/index.js').default;

// Mock Response Helper
function createMockResponse() {
  const res = {
    statusCode: 200,
    body: null,
    sent: false,
    headers: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      this.sent = true;
      return this;
    },
    send(data) {
      this.body = data;
      this.sent = true;
      return this;
    }
  };
  return res;
}

describe('ApiResponse Handler', () => {
  test('success() formats and returns 200 by default', () => {
    const res = createMockResponse();
    const data = { id: 1 };
    ApiResponse.success(res, data, 'Success message');

    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, {
      success: true,
      status: 200,
      message: 'Success message',
      data: { id: 1 }
    });
  });

  test('error() formats and returns 500 by default', () => {
    const res = createMockResponse();
    ApiResponse.error(res, 'Internal error');

    assert.strictEqual(res.statusCode, 500);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 500,
      message: 'Internal error'
    });
  });

  test('created() returns 201 response', () => {
    const res = createMockResponse();
    const data = { id: 2 };
    ApiResponse.created(res, data, 'User created');

    assert.strictEqual(res.statusCode, 201);
    assert.deepStrictEqual(res.body, {
      success: true,
      status: 201,
      message: 'User created',
      data: { id: 2 }
    });
  });

  test('accepted() returns 202 response', () => {
    const res = createMockResponse();
    const data = { job: 'process' };
    ApiResponse.accepted(res, data, 'Job accepted');

    assert.strictEqual(res.statusCode, 202);
    assert.deepStrictEqual(res.body, {
      success: true,
      status: 202,
      message: 'Job accepted',
      data: { job: 'process' }
    });
  });

  test('noContent() returns 204 response and no body', () => {
    const res = createMockResponse();
    ApiResponse.noContent(res);

    assert.strictEqual(res.statusCode, 204);
    assert.strictEqual(res.body, undefined);
  });

  test('badRequest() returns 400 response with errors', () => {
    const res = createMockResponse();
    const errors = { email: 'Invalid' };
    ApiResponse.badRequest(res, 'Bad Request', errors);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 400,
      message: 'Bad Request',
      errors: { email: 'Invalid' }
    });
  });

  test('unauthorized() returns 401 response', () => {
    const res = createMockResponse();
    ApiResponse.unauthorized(res, 'Unauthorized');

    assert.strictEqual(res.statusCode, 401);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 401,
      message: 'Unauthorized'
    });
  });

  test('forbidden() returns 403 response', () => {
    const res = createMockResponse();
    ApiResponse.forbidden(res, 'Forbidden');

    assert.strictEqual(res.statusCode, 403);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 403,
      message: 'Forbidden'
    });
  });

  test('notFound() returns 404 response', () => {
    const res = createMockResponse();
    ApiResponse.notFound(res, 'Not Found');

    assert.strictEqual(res.statusCode, 404);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 404,
      message: 'Not Found'
    });
  });

  test('methodNotAllowed() returns 405 response', () => {
    const res = createMockResponse();
    ApiResponse.methodNotAllowed(res, 'Method Not Allowed');

    assert.strictEqual(res.statusCode, 405);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 405,
      message: 'Method Not Allowed'
    });
  });

  test('conflict() returns 409 response', () => {
    const res = createMockResponse();
    ApiResponse.conflict(res, 'Conflict');

    assert.strictEqual(res.statusCode, 409);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 409,
      message: 'Conflict'
    });
  });

  test('unprocessableEntity() returns 422 response', () => {
    const res = createMockResponse();
    ApiResponse.unprocessableEntity(res, 'Unprocessable');

    assert.strictEqual(res.statusCode, 422);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 422,
      message: 'Unprocessable'
    });
  });

  test('tooManyRequests() returns 429 response', () => {
    const res = createMockResponse();
    ApiResponse.tooManyRequests(res, 'Too Many Requests');

    assert.strictEqual(res.statusCode, 429);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 429,
      message: 'Too Many Requests'
    });
  });

  test('internalServerError() returns 500 response', () => {
    const res = createMockResponse();
    ApiResponse.internalServerError(res, 'Internal Error');

    assert.strictEqual(res.statusCode, 500);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 500,
      message: 'Internal Error'
    });
  });

  test('notImplemented() returns 501 response', () => {
    const res = createMockResponse();
    ApiResponse.notImplemented(res, 'Not Implemented');

    assert.strictEqual(res.statusCode, 501);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 501,
      message: 'Not Implemented'
    });
  });

  test('badGateway() returns 502 response', () => {
    const res = createMockResponse();
    ApiResponse.badGateway(res, 'Bad Gateway');

    assert.strictEqual(res.statusCode, 502);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 502,
      message: 'Bad Gateway'
    });
  });

  test('serviceUnavailable() returns 503 response', () => {
    const res = createMockResponse();
    ApiResponse.serviceUnavailable(res, 'Service Unavailable');

    assert.strictEqual(res.statusCode, 503);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 503,
      message: 'Service Unavailable'
    });
  });

  test('gatewayTimeout() returns 504 response', () => {
    const res = createMockResponse();
    ApiResponse.gatewayTimeout(res, 'Gateway Timeout');

    assert.strictEqual(res.statusCode, 504);
    assert.deepStrictEqual(res.body, {
      success: false,
      status: 504,
      message: 'Gateway Timeout'
    });
  });

  describe('paginate()', () => {
    test('paginate() returns correct structure and calculations with valid inputs', () => {
      const res = createMockResponse();
      const data = [{ id: 1 }, { id: 2 }];
      ApiResponse.paginate(res, data, 2, 10, 45, 'Paginated records');

      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.body, {
        success: true,
        status: 200,
        message: 'Paginated records',
        data: [{ id: 1 }, { id: 2 }],
        meta: {
          currentPage: 2,
          itemsPerPage: 10,
          totalItems: 45,
          totalPages: 5,
          hasNextPage: true,
          hasPrevPage: true
        }
      });
    });

    test('paginate() handles invalid, string, negative, and NaN inputs gracefully', () => {
      const res = createMockResponse();
      const data = [];
      ApiResponse.paginate(res, data, 'invalid-page', -5, 'invalid-total');

      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.body, {
        success: true,
        status: 200,
        message: 'Data retrieved successfully',
        data: [],
        meta: {
          currentPage: 1, // falls back to 1
          itemsPerPage: 10, // falls back to 10
          totalItems: 0, // falls back to 0
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      });
    });
  });
});

