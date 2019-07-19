import { createPageProps } from '@/shared/PageProps';

export const entityContext = (entity: string) => ({
  findOne: (queryKey: string = '') =>
    createPageProps(ctx =>
      ctx.httpHelper.get(
        `/api/${entity}/${ctx.query[queryKey || `${entity}_id`]}`,
      ),
    ),
  find: (path: string = '') =>
    createPageProps(ctx => ctx.httpHelper.get(`/api/${entity}/${path}`)),
});
