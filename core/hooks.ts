export * from 'react-use';

import React, { useContext } from 'react';
import { useRouter } from 'next/router';

export const defaultPageProps = {
  statusCode: 200,
  error: null,
};

export const PageProps = React.createContext(defaultPageProps);

export function usePageProps<T = any>(): T {
  return useContext(PageProps) as any;
}

export function useQuery<T = any>(): T {
  return useRouter().query as any;
}
