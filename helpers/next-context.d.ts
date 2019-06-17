import { DefaultQuery } from 'next/router';
import { NextContext } from 'next';
import { http } from './fetch';

declare module 'next' {
  interface NextContext<Q extends DefaultQuery = DefaultQuery, CustomReq = {}> {
    redirect: (path: string) => void;
    getToken: () => string;
    http: typeof http;
  }
}
