import { Button, NavbarGroup } from '@blueprintjs/core';
import { Link } from '@helpers/route';
import { LoginForm } from '@helpers/forms/login';
import { Logo } from '@components/vi';
import { Page } from '@components/page';
import React from 'react';
import { composePageProps } from '@core/next-compose';
import { signedUser } from '@helpers/page-props';

export default composePageProps(signedUser.redirect('/'))(() => {
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
});
