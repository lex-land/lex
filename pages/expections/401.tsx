import { LoginForm } from '@/components/LoginForm';
import { Page } from '@/components/Page';
import React from 'react';

export default function Error401() {
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
}
