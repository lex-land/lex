import {
  createAppProps,
  createBoolean,
  createPageProps,
} from '@core/next-compose';
import { Module } from '@server/module/module.entity';
import { NextAppContext } from 'next/app';
import { Organization } from '@server/organization/organization.entity';
import { Repository } from '@server/repository/repository.entity';
import Router from 'next/router';
import { User } from '@server/user/user.entity';
import { createHttp } from './fetch';
import { getToken } from './secure';
import { session } from './service';

export const createRedirect = createPageProps(ctx => {
  return (path: string) => {
    // https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    const res = ctx.res;
    if (res) {
      res.writeHead(302, {
        Location: path,
      });
      res.end();
    } else {
      Router.push(path);
    }
    return { statusCode: 302 };
  };
});

export type enhancedAppProps<T = any> = (ctx: NextAppContext) => T;

export const enhancedCtx = <T>(fn: enhancedAppProps<T>) =>
  createAppProps(async appCtx => {
    const { ctx } = appCtx;
    ctx.getToken = () => getToken(ctx); // 必须放在第一个
    ctx.http = createHttp(ctx);
    ctx.redirect = createRedirect(ctx);
    return fn(appCtx);
  });

export const token = createPageProps(ctx => ({ token: ctx.getToken() }));

// ----------------------------------------------------------------------
// 角色
const isNewComer = createBoolean(ctx => !ctx.getToken());
const isSignedUser = createBoolean(ctx => session.isSigned());

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
  session: createPageProps(async () => ({
    user: await session.user(),
  })),
  all: createPageProps(async ctx => {
    return { users: await ctx.http.get<User[]>(`/api/user`) };
  }),
};

export const repo = createPageProps(async ctx => {
  const repoId = ctx.query.repository_id;
  return {
    repo: await ctx.http.get<Repository>(`/api/repository/${repoId}`),
  };
});

export const org = createPageProps(async ctx => {
  return {
    org: await ctx.http.get<Organization>(
      `/api/organization/${ctx.query.org_id}`,
    ),
  };
});

export const mods = createPageProps(async ctx => {
  return {
    mods: await ctx.http.get<Module[]>(`/api/module`, {
      repository: ctx.query.repository_id,
    }),
  };
});

export const mod = createPageProps(async ctx => {
  const modId = ctx.query.module_id;
  return {
    mod: await ctx.http.get<Module>(`/api/module/${modId}`),
  };
});

export const inte = createPageProps(async ctx => {
  const inteId = ctx.query.interface_id;
  return {
    inte: inteId && (await ctx.http.get(`/api/interface/${inteId}`)),
  };
});
