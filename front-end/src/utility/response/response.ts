// src/utils/customError.ts
type Package = {
  code: number;
  message: string;
  data: any;
};

export class Payload {
  public code: number;
  public message: string;
  public data: any;

  constructor(payload: Package) {
    this.code = payload?.code;
    this.message = payload?.message;
    this.data = payload?.data;

    Object.setPrototypeOf(this, Payload.prototype);
  }
}
