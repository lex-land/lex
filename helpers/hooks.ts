export * from 'react-use';

import React, { useContext } from 'react';
import { PageProps } from '@helpers/next-middleware';
import { useRouter } from 'next/router';

export const PagePropsContext = React.createContext({});

export function usePageProps<T = PageProps>(): T {
  return useContext(PagePropsContext) as any;
}

export function useQuery<T = any>(): T {
  return useRouter().query as any;
}
