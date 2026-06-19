// src/utils/customError.ts

export class AppError extends Error {
  public code: number;
  public payload: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.code = statusCode;
    this.payload = data;

    // Restores correct prototype chain (required when extending built-in classes in TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
