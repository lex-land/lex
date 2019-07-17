import React, { useContext } from 'react';
import { AppContext } from 'next/app';
import { NextPageContext } from 'next';

export const PagePropsContext = React.createContext({});

export function usePageProps<T = any>(): T {
  return useContext(PagePropsContext) as T;
}
export const createPageProps = <T>(fn: (ctx: NextPageContext) => T) => fn;
export const createAppProps = <T>(fn: (ctx: AppContext) => T) => fn;
export const createBoolean = (
  fn: (ctx: NextPageContext) => boolean | Promise<boolean>,
) => fn;

export const composePageProps = (...funcs: any[]) => (Component: any) => {
  if (!funcs) return Component;
  const orig = Component.getInitialProps;
  Component.displayName = `ComposedPage`;
  Component.getInitialProps = async (ctx: NextPageContext | AppContext) => {
    let props = (orig && (await orig(ctx))) || {};
    const promises = funcs.map(async fn => await fn(ctx));
    const newProps = await Promise.all(promises);
    newProps.forEach(prop => {
      props = { ...props, ...prop };
    });
    return props;
  };
  return Component;
};
