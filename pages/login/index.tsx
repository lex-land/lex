import { Button, NavbarGroup } from '@blueprintjs/core';
import { compose, redirect } from '@/shared/PageProps';
import Link from 'next/link';
import { LoginForm } from '@/components/LoginForm';
import { Logo } from '@/components/Logo';
import { Page } from '@/components/Page';
import React from 'react';
import { unauthorized } from '@/helpers/unauthorized';

const guard = [redirect('/').when(unauthorized)];

export default compose(guard)(() => {
  return (
    <Page backgroundColor="#e9ebee">
      <Page.UnlogedNavbar>
        <Page.Container>
          <NavbarGroup>
            <Logo />
            <Link href="/join">
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
          <Link href="/join">
            <a>Create an account</a>
          </Link>
        </Page.Card.Footer>
      </Page.Card>
    </Page>
  );
});
