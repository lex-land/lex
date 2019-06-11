import { DefaultQuery } from 'next/router';

declare module 'next' {
  interface NextContext<Q extends DefaultQuery = DefaultQuery, CustomReq = {}> {
    redirect: (path: string) => void;
    getToken: () => string;
    setToken: (token: string) => void;
  }
}
