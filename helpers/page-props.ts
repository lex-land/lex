import { createBoolean, createPageProps } from '@/core/PageProps';
import { Module } from '@/interfaces/Module';
import { Organization } from '@/interfaces/Organization';
import { Repository } from '@/interfaces/Repository';
import { User } from '@/interfaces/User';

// ----------------------------------------------------------------------
// 角色
const isNewComer = createBoolean(ctx => !ctx.tokenUtil.get());
const isSignedUser = createBoolean(ctx =>
  ctx.httpUtil
    .get(`/api/session`)
    .then(({ statusCode }) => statusCode !== 401)
    .catch(() => false),
);

const Roles = { isNewComer, isSignedUser };

export const redirect = (
  path: string,
  { when }: { when: keyof typeof Roles },
) =>
  createPageProps(async ctx => {
    if (await Roles[when](ctx)) ctx.redirect(path);
    return {};
  });

export const newComer = {
  isNewComer,
  redirect: (path: string) => redirect(path, { when: 'isNewComer' }),
};

export const signedUser = {
  isSignedUser,
  redirect: (path: string) => redirect(path, { when: 'isSignedUser' }),
};
// ----------------------------------------------------------------------

export const user = {
  session: createPageProps(async ctx => {
    const json = await ctx.httpUtil.get(`/api/session/user`);
    return {
      session: json,
    };
  }),
  all: createPageProps(async ctx => {
    return { allUsers: await ctx.httpUtil.get<User[]>(`/api/user`) };
  }),
};

export const repo = createPageProps(async ctx => {
  const repoId = ctx.query.repository_id;
  return {
    repo: await ctx.httpUtil.get<Repository>(`/api/repository/${repoId}`),
  };
});

export const org = createPageProps(async ctx => {
  return {
    org: await ctx.httpUtil.get<Organization>(
      `/api/organization/${ctx.query.org_id}`,
    ),
  };
});

export const mods = createPageProps(async ctx => {
  return {
    mods: await ctx.httpUtil.get<Module[]>(`/api/module`, {
      repository: ctx.query.repository_id,
    }),
  };
});

export const mod = createPageProps(async ctx => {
  const modId = ctx.query.module_id;
  return {
    mod: await ctx.httpUtil.get<Module>(`/api/module/${modId}`),
  };
});

export const inte = createPageProps(async ctx => {
  const inteId = ctx.query.interface_id;
  return {
    inte: await ctx.httpUtil.get(`/api/interface/${inteId}`),
  };
});
