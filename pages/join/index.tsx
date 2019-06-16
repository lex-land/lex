import { Logo } from '@components/vi';
import { NavbarGroup } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { http } from '@helpers/fetch';
import { login } from '@helpers/service';
import md5 from 'md5';
import { route } from '@helpers/next-routes';

const joinValue = {
  fullname: '',
  email: '',
  password: '',
};

type joinValue = typeof joinValue;

const Join: NextSFC = () => {
  return (
    <Page backgroundColor="#e9ebee">
      <Page.UnlogedNavbar>
        <NavbarGroup className="lex-container">
          <Logo />
        </NavbarGroup>
      </Page.UnlogedNavbar>
      <Page.Card>
        <Page.Card.Title>Create a New Account</Page.Card.Title>
        <QuickForm
          controlLarge
          fields={Object.keys(joinValue)}
          defaultValue={joinValue}
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
            route('/').replace({});
          }}
        />
      </Page.Card>
    </Page>
  );
};

Join.getInitialProps = async ctx => {
  if (await ctx.authorized()) {
    return ctx.redirect('/');
  }
  return {};
};

export default Join;
