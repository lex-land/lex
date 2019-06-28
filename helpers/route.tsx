export * from '@core/next-routes';
import _ from 'lodash';
import routes from '@config/routes';

const { Router, Link } = routes;

export const route = (route: string = Router.route, params?: any) => {
  const replace = (state: any = {}) => {
    Router.replaceRoute(route, _.pickBy(state, Boolean));
  };

  const push = (state: any = {}) => {
    Router.pushRoute(route, _.pickBy(state, Boolean));
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
