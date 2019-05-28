export interface FetchResponse<D> {
  code: number;
  data: D;
  msg: string;
}

export interface NormalizeParams {
  timeStamp?: number;
  randomNum?: number;
  isEncrypted?: number;
  params?: string;
  file?: string;
  sign?: string;
  lang?: string;
}

export type FetchFn = (
  url: RequestInfo | string,
  opts: RequestInit,
) => Promise<Response>;
