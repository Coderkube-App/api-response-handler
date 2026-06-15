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
