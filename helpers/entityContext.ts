import { createPageProps } from '@/shared/PageProps';

export const entityContext = (entity: string) => ({
  findOne: () =>
    createPageProps(ctx =>
      ctx.httpUtil.get(`/api/${entity}/${ctx.query[`${entity}_id`]}`),
    ),
  find: (path?: string) =>
    createPageProps(ctx => ctx.httpUtil.get(`/api/${entity}/${path}`)),
});
