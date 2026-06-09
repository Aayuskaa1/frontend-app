interface ApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export class ApiResponseHelper {
  static success<T>(
    message: string,
    data: T,
    status = 200,
    meta?: Record<string, unknown>
  ): ApiResponse<T> {
    const response: ApiResponse<T> = {
      status,
      success: true,
      message,
      data,
    };

    if (meta) {
      response.meta = meta;
    }

    return response;
  }

  static error(
    message: string,
    status = 500,
    data: Record<string, unknown> = {}
  ): ApiResponse<Record<string, unknown>> {
    return {
      status,
      success: false,
      message,
      data,
    };
  }
}
