import { Logo } from '@components/vi';
import { NavbarGroup } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
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
          large
          fields={Object.keys({
            fullname: '',
            email: '',
            password: '',
          })}
          submitButton={{
            intent: 'success',
            className: 'login-button',
            text: 'Sign Up',
          }}
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
