import React, { useContext } from 'react';
import { flatMapDeep, mapValues } from 'lodash';
import { AppContext } from 'next/app';
import { NextPageContext } from 'next';
import { logger } from './logger';

export const PagePropsContext = React.createContext({});

export function usePageProps<T = any>(propName?: string): T {
  const pageProps = useContext<any>(PagePropsContext);
  if (propName) {
    if (!pageProps[propName]) {
      logger.error(
        `[usePageProps] '${propName}' not found. Are you forget to compose it?`,
      );
    }
    return pageProps[propName];
  } else {
    // logger.warn(
    //   `[usePageProps] \`pageProp.use()\` or \`usePageProps()\` is deprecated! Please use \`pageProp.use('some key')\` or \`usePageProps('some key')\` instead`,
    // );
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
    const promises = flatMapDeep(funcs).map(async (fn) => await fn(ctx));
    const newProps = await Promise.all(promises);
    newProps.forEach((prop) => {
      props = { ...props, ...prop };
    });
    return props;
  };
  return Component;
};

export type PagePropsMap<T = any> = createPagePropsFn<T>[];
export type AppPropsMap<T = any> = createAppPropsFn<T>[];

export const compose = composePageProps;

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

// TODO: 类型定义
export const createMany = (obj: any) => {
  return Object.assign(
    async (ctx: NextPageContext) => {
      const values = await Promise.all(
        Object.values(obj).map((fn: any) => fn(ctx)),
      );
      return mapValues(obj, (fn, key) => {
        const index = Object.keys(obj).findIndex((i) => i === key);
        return values[index];
      });
    },
    {
      use: usePageProps,
    },
  );
};
