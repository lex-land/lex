import Routes from 'next-routes';
import _ from 'lodash';
import pluralize from 'pluralize';

const routes = new Routes();

interface Methods {
  index: string[];
  create: string[];
  show: string[];
  edit: string[];
}

type Method = keyof Methods;

interface Output {
  output: Partial<Methods>[];
}

export const get = (source: string): Output => {
  return {
    output: [{ index: [source, `/${source}`, source] }],
  };
};

export const root = (source: string): Output => {
  return {
    output: [{ index: ['', '/', source] }],
  };
};

export const add = ({ output }: Output) => {
  output.forEach((methods: any) => {
    Object.keys(methods).forEach(key => {
      const [name, pattern, page] = methods[key];
      routes.add(name, pattern, page);
    });
  });
};

export const genId = (resource: string) => `${pluralize.singular(resource)}_id`;

interface SetMethodOpt {
  only: Method[];
}

const setMethods = (
  source: string,
  currentId: string,
  base: string,
  setMethodOpt?: SetMethodOpt,
): Partial<Methods> => {
  const { only = [] } = setMethodOpt || {};
  const page = source;
  const methods = {
    index: [`${page}`, base, page],
    create: [`${page}/new`, `${base}/new`, `${page}/new`],
    show: [`${page}/show`, `${base}/:${currentId}`, `${page}/show`],
    edit: [`${page}/edit`, `${base}/edit/:${currentId}`, `${page}/edit`],
  };

  if (only.length > 0) {
    return _.pick(methods, only) as any;
  } else {
    return methods;
  }
};

interface Resource extends Output {
  nest: (...result: any[]) => Output;
}

export const resources = (
  route: string,
  setMethodOpt?: SetMethodOpt,
): Resource => {
  const self = {
    route,
    output: [setMethods(route, genId(route), `/${route}`, setMethodOpt)] as any,
    nest: (...results: any[]) => {
      results.forEach(result => {
        self.output.push(
          setMethods(
            [route, result.route].join('/'),
            genId(result.route),
            `/${route}/:${genId(route)}/${result.route}`,
            setMethodOpt,
          ),
        );
      });
      return self;
    },
  };
  return self;
};

export default routes;
