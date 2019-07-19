import { createBoolean } from '@/shared/PageProps';

export const unauthorized = createBoolean(ctx =>
  ctx.httpHelper
    .get(`/api/session`)
    .then(({ statusCode }) => statusCode !== 401)
    .catch(() => false),
);
