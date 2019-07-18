import { createBoolean } from '@/shared/PageProps';

export const unauthorized = createBoolean(ctx =>
  ctx.httpUtil
    .get(`/api/session`)
    .then(({ statusCode }) => statusCode !== 401)
    .catch(() => false),
);
