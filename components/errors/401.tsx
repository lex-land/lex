import './error.less';
import LoginForm from '@components/forms/login';
import { Page } from '@components/layout';
import React from 'react';

export const Error401 = () => {
  return (
    <Page className="Error">
      <div className="title">
        <h1 className="h1">401</h1>
        <div className="description">抱歉，你的登录身份已失效，请重新登录</div>
      </div>
      <LoginForm title="重新登录" />
    </Page>
  );
};
