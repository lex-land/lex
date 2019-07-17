export class FetchError implements Error {
  name: string;
  message: string;
  code: number;
  constructor(code: number, message?: string) {
    this.name = `接口异常`;
    this.code = code;
    this.message = message || `接口异常[${code}]`;
  }
}
