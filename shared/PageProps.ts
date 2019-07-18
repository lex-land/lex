import React, { useContext } from 'react';
import { AppContext } from 'next/app';
import { NextPageContext } from 'next';

export const PagePropsContext = React.createContext({});

export function usePageProps<T = any>(propName?: string): T {
  const pageProps = useContext<any>(PagePropsContext);
  if (propName) {
    return pageProps[propName];
  } else {
    return pageProps;
  }
}
export type createPagePropsFn<T> = (ctx: NextPageContext) => T;
export type createAppPropsFn<T> = (ctx: AppContext) => T;
export type createBooleanFn = (
  ctx: NextPageContext,
) => boolean | Promise<boolean>;

export const createPageProps = <T>(fn: createPagePropsFn<T>) => fn;
export const createAppProps = <T>(fn: createAppPropsFn<T>) => fn;
export const createBoolean = (fn: createBooleanFn) => fn;

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

export type PagePropsMap<T = any> = createPagePropsFn<T>[];
export type AppPropsMap<T = any> = createAppPropsFn<T>[];

export const compose = <T>(fns: PagePropsMap<T> | AppPropsMap<T>) =>
  composePageProps(...fns);

export const redirect = (path: string) => ({
  when: (condition: createBooleanFn) => async (ctx: any) => {
    if (await condition(ctx)) ctx.redirect(path);
    return {};
  },
  whenNot: (condition: createBooleanFn) => async (ctx: any) => {
    if (!(await condition(ctx))) ctx.redirect(path);
    return {};
  },
});
