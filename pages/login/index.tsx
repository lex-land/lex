import './index.less';
import { Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import LoginForm from '@components/forms/login';
import { Logo } from '@components/vi';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const Login: NextSFC = () => {
  return (
    <Page backgroundColor="#e9ebee" className="login-page">
      <Navbar className={Classes.DARK}>
        <NavbarGroup className="lex-container">
          <Logo />
          <Link route="join">
            <Button style={{ marginLeft: 8 }} intent="success">
              注册
            </Button>
          </Link>
        </NavbarGroup>
      </Navbar>
      <LoginForm
        title="登录 Lex"
        footer={
          <div className="login-form__footer">
            还没有一个账户？
            <Link route="join">
              <a>创建新用户</a>
            </Link>
          </div>
        }
      />
    </Page>
  );
};

Login.getInitialProps = async ctx => {
  if (await ctx.authorized()) {
    return ctx.redirect('/');
  }
  return {};
};

export default Login;
