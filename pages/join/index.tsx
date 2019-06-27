import { Button, NavbarGroup } from '@blueprintjs/core';
import { Field } from 'components/forms/Field';
import { Logo } from '@components/vi';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { composePageProps } from '@core/next-compose';
import { http } from '@helpers/fetch';
import { login } from '@helpers/service';
import md5 from 'md5';
import { route } from '@helpers/route';
import { signedUser } from '@helpers/page-props';

const emailValidate = (value: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return '';
};

export default composePageProps(signedUser.redirect('/'))(() => {
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
          large
          defaultValue={{
            fullname: '',
            email: '',
            password: '',
          }}
          render={() => (
            <>
              <Field.Input
                large
                name="email"
                component="input"
                validate={emailValidate}
              />
              <Field.Input large name="fullname" />
              <Field.Input large name="password" type="password" />
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
            http.post(`/api/user`, {
              ...values,
              password: values.password && md5(values.password),
            })
          }
          success={values => {
            login({
              username: values.fullname,
              password: values.password,
            });
            route('/').replace();
          }}
        />
      </Page.Card>
    </Page>
  );
});
