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
          defaultValue={{
            fullname: '',
            email: '',
            password: '',
          }}
          render={() => (
            <>
              <Field.Input large name="email" component="input" />
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
