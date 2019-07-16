import { DefaultQuery } from 'next/router';
import { NextPageContext } from 'next';
import { http } from './fetch';

declare module 'next' {
  interface NextPageContext<
    Q extends DefaultQuery = DefaultQuery,
    CustomReq = {}
  > {
    redirect: (path: string) => void;
    getToken: () => string;
    http: typeof http;
  }
}
