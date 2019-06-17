import { LoginForm } from '@helpers/forms/login';
import { Page } from '@components/page';
import React from 'react';

export const Error401 = () => {
  return (
    <Page>
      <Page.Error
        code={401}
        description="抱歉，你的登录身份已失效，请重新登录"
      />
      <Page.Card>
        <LoginForm />
      </Page.Card>
    </Page>
  );
};
