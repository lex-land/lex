import { DefaultQuery } from 'next/router';
import { NextPageContext } from 'next';

declare module 'next' {
  interface NextPageContext<
    Q extends DefaultQuery = DefaultQuery,
    CustomReq = {}
  > {
    redirect: (path: string) => void;
    tokenUtil: {
      set: (token: string) => void;
      get: () => any;
      clear: () => void;
    };
    httpHelper: {
      get: <D = any>(url: string, query?: any) => Promise<D>;
      post: <D = any>(url: string, query?: any) => Promise<D>;
      put: <D = any>(url: string, query?: any) => Promise<D>;
      delete: <D = any>(url: string, query?: any) => Promise<D>;
    };
  }
}
