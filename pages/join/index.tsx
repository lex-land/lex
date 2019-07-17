import { Button, NavbarGroup } from '@blueprintjs/core';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Page } from '@/components/Page';
import { QuickForm } from '@/components/forms';
import React from 'react';
import { composePageProps } from '@/core/PageProps';
import { createEntityFn } from '@/core/EntityUtil';
import { login } from '@/helpers/login';
import md5 from 'md5';
import { signedUser } from '@/helpers/page-props';
import { useRouter } from 'next/router';

const createUser = createEntityFn('user');

export default composePageProps(signedUser.redirect('/'))(() => {
  const router = useRouter();
  return (
    <Page backgroundColor="#e9ebee">
      <Page.UnlogedNavbar>
        <Page.Container>
          <NavbarGroup>
            <Logo />
          </NavbarGroup>
        </Page.Container>
      </Page.UnlogedNavbar>
      <Page.Card>
        <Page.Card.Title>Create a New Account</Page.Card.Title>
        <QuickForm
          defaultValue={{
            fullname: '',
            email: '',
            password: '',
          }}
          render={() => (
            <>
              <QuickForm.Input large name="email" component="input" />
              <QuickForm.Input large name="fullname" />
              <QuickForm.Input large name="password" type="password" />
              <Button
                intent="success"
                className="login-button"
                type="submit"
                large
                text="Sign Up"
              />
            </>
          )}
          action={values =>
            createUser({
              ...values,
              password: values.password && md5(values.password),
            })
          }
          success={values => {
            login({
              username: values.fullname,
              password: values.password,
            });
            router.replace('/');
          }}
        />
        <Page.Card.Footer>
          Already have an account?
          <Link href="/login">
            <a> Log In</a>
          </Link>
        </Page.Card.Footer>
      </Page.Card>
    </Page>
  );
});
