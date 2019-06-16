import { Button, NavbarGroup } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import { LoginForm } from '@helpers/login';
import { Logo } from '@components/vi';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const Login: NextSFC = () => {
  return (
    <Page backgroundColor="#e9ebee">
      <Page.UnlogedNavbar>
        <Page.Container>
          <NavbarGroup>
            <Logo />
            <Link route="join">
              <Button style={{ marginLeft: 8 }} intent="success">
                Sign Up
              </Button>
            </Link>
          </NavbarGroup>
        </Page.Container>
      </Page.UnlogedNavbar>
      <Page.Card>
        <Page.Card.Title>Log Into Lex</Page.Card.Title>
        <LoginForm />
        <Page.Card.Footer>
          New to Lex？
          <Link route="join">
            <a>Create an account</a>
          </Link>
        </Page.Card.Footer>
      </Page.Card>
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
