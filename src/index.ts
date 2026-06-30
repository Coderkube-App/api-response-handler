/**
 * Standard API Response structure
 */
export interface IApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: any;
  meta?: any;
}

/**
 * API Response Handler class
 */
export class ApiResponse {
  /**
   * Send a success response
   * @param res - Response object (Express-like)
   * @param data - The data to send
   * @param message - Success message
   * @param statusCode - HTTP status code (default 200)
   * @param meta - Additional metadata (pagination, etc.)
   */
  static success(
    res: any,
    data: any = null,
    message: string = 'Success',
    statusCode: number = 200,
    meta: any = null
  ) {
    const response: IApiResponse = {
      success: true,
      status: statusCode,
      message,
      data,
    };

    if (meta) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param statusCode - HTTP status code (default 500)
   * @param errors - Detailed error information
   */
  static error(
    res: any,
    message: string = 'Internal Server Error',
    statusCode: number = 500,
    errors: any = null
  ) {
    const response: IApiResponse = {
      success: false,
      status: statusCode,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  // --- SUCCESS RESPONSES ---

  /**
   * Send a 201 Created response
   * @param res - Response object (Express-like)
   * @param data - The data to send
   * @param message - Success message
   * @param meta - Additional metadata
   */
  static created(
    res: any,
    data: any = null,
    message: string = 'Created',
    meta: any = null
  ) {
    return this.success(res, data, message, 201, meta);
  }

  /**
   * Send a 202 Accepted response
   * @param res - Response object (Express-like)
   * @param data - The data to send
   * @param message - Success message
   * @param meta - Additional metadata
   */
  static accepted(
    res: any,
    data: any = null,
    message: string = 'Accepted',
    meta: any = null
  ) {
    return this.success(res, data, message, 202, meta);
  }

  /**
   * Send a 204 No Content response
   * @param res - Response object (Express-like)
   */
  static noContent(res: any) {
    return res.status(204).send();
  }

  // --- CLIENT ERROR RESPONSES ---

  /**
   * Send a 400 Bad Request response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static badRequest(
    res: any,
    message: string = 'Bad Request',
    errors: any = null
  ) {
    return this.error(res, message, 400, errors);
  }

  /**
   * Send a 401 Unauthorized response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static unauthorized(
    res: any,
    message: string = 'Unauthorized',
    errors: any = null
  ) {
    return this.error(res, message, 401, errors);
  }

  /**
   * Send a 403 Forbidden response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static forbidden(
    res: any,
    message: string = 'Forbidden',
    errors: any = null
  ) {
    return this.error(res, message, 403, errors);
  }

  /**
   * Send a 404 Not Found response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static notFound(
    res: any,
    message: string = 'Not Found',
    errors: any = null
  ) {
    return this.error(res, message, 404, errors);
  }

  /**
   * Send a 405 Method Not Allowed response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static methodNotAllowed(
    res: any,
    message: string = 'Method Not Allowed',
    errors: any = null
  ) {
    return this.error(res, message, 405, errors);
  }

  /**
   * Send a 409 Conflict response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static conflict(
    res: any,
    message: string = 'Conflict',
    errors: any = null
  ) {
    return this.error(res, message, 409, errors);
  }

  /**
   * Send a 422 Unprocessable Entity response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static unprocessableEntity(
    res: any,
    message: string = 'Unprocessable Entity',
    errors: any = null
  ) {
    return this.error(res, message, 422, errors);
  }

  /**
   * Send a 429 Too Many Requests response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static tooManyRequests(
    res: any,
    message: string = 'Too Many Requests',
    errors: any = null
  ) {
    return this.error(res, message, 429, errors);
  }

  // --- SERVER ERROR RESPONSES ---

  /**
   * Send a 500 Internal Server Error response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static internalServerError(
    res: any,
    message: string = 'Internal Server Error',
    errors: any = null
  ) {
    return this.error(res, message, 500, errors);
  }

  /**
   * Send a 501 Not Implemented response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static notImplemented(
    res: any,
    message: string = 'Not Implemented',
    errors: any = null
  ) {
    return this.error(res, message, 501, errors);
  }

  /**
   * Send a 502 Bad Gateway response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static badGateway(
    res: any,
    message: string = 'Bad Gateway',
    errors: any = null
  ) {
    return this.error(res, message, 502, errors);
  }

  /**
   * Send a 503 Service Unavailable response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static serviceUnavailable(
    res: any,
    message: string = 'Service Unavailable',
    errors: any = null
  ) {
    return this.error(res, message, 503, errors);
  }

  /**
   * Send a 504 Gateway Timeout response
   * @param res - Response object (Express-like)
   * @param message - Error message
   * @param errors - Detailed error information
   */
  static gatewayTimeout(
    res: any,
    message: string = 'Gateway Timeout',
    errors: any = null
  ) {
    return this.error(res, message, 504, errors);
  }

  /**
   * Send a paginated response
   * @param res - Response object
   * @param data - Array of data
   * @param page - Current page
   * @param limit - Items per page
   * @param totalItems - Total count in database
   * @param message - Success message
   */
  static paginate(
    res: any,
    data: any[],
    page: number,
    limit: number,
    totalItems: number,
    message: string = 'Data retrieved successfully'
  ) {
    // Sanitize inputs — guard against NaN, 0, negative, or empty string values
    let safePage = parseInt(String(page), 10);
    if (isNaN(safePage) || safePage <= 0) {
      safePage = 1;
    }

    let safeLimit = parseInt(String(limit), 10);
    if (isNaN(safeLimit) || safeLimit <= 0) {
      safeLimit = 10;
    }
    const safeTotalItems = Math.max(0, parseInt(String(totalItems), 10) || 0);

    const totalPages = Math.ceil(safeTotalItems / safeLimit);
    const meta = {
      currentPage: safePage,
      itemsPerPage: safeLimit,
      totalItems: safeTotalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    };

    return this.success(res, data, message, 200, meta);
  }
}

export default ApiResponse;
