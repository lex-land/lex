export * from '@core/next-routes';
import _ from 'lodash';
import routes from '@config/routes';

const { Router, Link } = routes;

export const route = (route: string = Router.route.substr(1)) => {
  const replace = (state: any) => {
    Router.replaceRoute(route, _.pickBy(state, Boolean));
  };

  const push = (state: any) => {
    Router.pushRoute(route, _.pickBy(state, Boolean));
  };

  const pushMerge = (state: any) => {
    push({ ...Router.query, ...state });
  };

  const pushRemove = (deleteKeys: string[]) => {
    const newState = _.omit(Router.query, deleteKeys);
    push(newState);
  };

  const replaceMerge = (state: any) => {
    replace({ ...Router.query, ...state });
  };

  const pushHash = (state: string) => {
    Router.push(`/${route}#${state}`);
  };

  const replaceRemove = (deleteKeys: string[]) => {
    const newState = _.omit(Router.query, deleteKeys);
    replace(newState);
  };

  return {
    push,
    replace,
    pushMerge: pushMerge,
    pushRemove,
    replaceMerge,
    replaceRemove,
    pushHash,
  };
};

export { Router, Link };
