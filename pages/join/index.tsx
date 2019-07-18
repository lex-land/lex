import { Button, NavbarGroup } from '@blueprintjs/core';
import { compose, redirect } from '@/shared/PageProps';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Page } from '@/components/Page';
import { QuickForm } from '@/shared/QuickForm';
import React from 'react';
import { login } from '@/helpers/login';
import { register } from '@/helpers/register';
import { unauthorized } from '@/helpers/unauthorized';
import { useRouter } from 'next/router';

const defaultValue = {
  fullname: '',
  email: '',
  password: '',
};

const guard = [redirect('/').when(unauthorized)];

export default compose(guard)(() => {
  const router = useRouter();

  const onRegisterSuccess = async (values: typeof defaultValue) => {
    await login({
      username: values.fullname,
      password: values.password,
    });
    router.replace('/');
  };

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
          defaultValue={defaultValue}
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
          action={register}
          success={onRegisterSuccess}
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
