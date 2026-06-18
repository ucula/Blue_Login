// src/utils/customError.ts

export class AppError extends Error {
  public code: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.code = statusCode;

    // Restores correct prototype chain (required when extending built-in classes in TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
