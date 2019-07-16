import NextLink from 'next/link';
import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

const Link = (props: any) => <NextLink {...props} />;

export const route = (route: string = Router.route, params?: any) => {
  const replace = (state: any = {}) => {
    Router.replace(route, _.pickBy(state, Boolean));
  };

  const push = (state: any = {}) => {
    Router.push(route, _.pickBy(state, Boolean));
  };

  const createUtil = (state: any = {}) => ({
    push: () => push(params || state),
    replace: () => replace(params || state),
  });

  const merge = (state: any = {}) => createUtil({ ...Router.query, ...state });
  const remove = (deleteKeys: string[]) =>
    createUtil(_.omit(Router.query, deleteKeys));

  return {
    remove,
    merge,
    push,
    replace,
  };
};

export { Router, Link };
