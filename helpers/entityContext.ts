import { createPageProps } from '@/shared/PageProps';

export const entityContext = (entity: string) => ({
  findOne: () =>
    createPageProps(ctx =>
      ctx.httpHelper.get(`/api/${entity}/${ctx.query[`${entity}_id`]}`),
    ),
  find: (path: string = '') =>
    createPageProps(ctx => ctx.httpHelper.get(`/api/${entity}/${path}`)),
});
