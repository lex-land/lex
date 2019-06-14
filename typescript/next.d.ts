import { DefaultQuery } from 'next/router';
import { http } from '@helpers/fetch';

declare module 'next' {
  interface NextContext<Q extends DefaultQuery = DefaultQuery, CustomReq = {}> {
    redirect: (path: string) => void;
    getToken: () => string;
    setToken: (token: string) => void;
    http: typeof http;
  }
}
