import React, { useContext } from 'react';
import { NextAppContext } from 'next/app';
import { NextContext } from 'next';

export const PagePropsContext = React.createContext({});

export function usePageProps<T = any>(): T {
  return useContext(PagePropsContext) as T;
}

export const composePageProps = (...funcs: any[]) => (Component: any) => {
  if (!funcs) return Component;
  const orig = Component.getInitialProps;
  Component.displayName = `ComposedPage`;
  Component.getInitialProps = async (ctx: NextContext | NextAppContext) => {
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

export const createPageProps = <T>(fn: (ctx: NextContext) => T) => fn;
export const createAppProps = <T>(fn: (ctx: NextAppContext) => T) => fn;
export const createBoolean = (
  fn: (ctx: NextContext) => boolean | Promise<boolean>,
) => fn;
