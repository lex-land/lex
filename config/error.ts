import { isClient } from './env';
import { logger } from '@core/logger';

export interface ResponseData {
  code: number;
  data: any;
  msg: string;
}

export class FetchError implements Error {
  name: string;
  message: string;
  code: number;
  constructor(code: number, message: string) {
    this.name = '接口异常';
    this.code = code;
    this.message = message;
  }
}

export function reportError(_error: any) {
  logger.error(_error);
}

// fetch异常
export const onUnhandledrejection = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

export const onWindowError = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

export const catchError = () => {
  if (isClient) {
    window.onerror = onWindowError;
    window.addEventListener('unhandledrejection', onUnhandledrejection);
  }
};
