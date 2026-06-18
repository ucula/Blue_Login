export class AppSuccess<T = any> {
  public code: number;
  public data?: T;

  constructor(statusCode: number, data?: T) {
    this.code = statusCode;
    this.data = data;
  }
}
