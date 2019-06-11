import './index.less';
import {
  Button,
  Card,
  Classes,
  FormGroup,
  H3,
  InputGroup,
  Intent,
  Navbar,
  NavbarGroup,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { Form, Formik } from 'formik';
import { Logo } from '@components/vi';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { http } from '@helpers/fetch';
import md5 from 'md5';
import { route } from '@helpers/next-routes';

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

const handleSubmit = async (values: LoginValue) => {
  const { accessToken } = await http.post(`/api/user`, {
    ...values,
    password: md5(values.password),
  });
  if (accessToken) {
    route('/').replace({});
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: '登录成功',
    });
  }
};

const Join: NextSFC = () => {
  return (
    <Page backgroundColor="#e9ebee" className="login">
      <Formik
        initialValues={loginValue}
        onSubmit={handleSubmit}
        render={formik => (
          <Form>
            <Navbar className={Classes.DARK}>
              <NavbarGroup className="lex-container">
                <Logo />
              </NavbarGroup>
            </Navbar>
            <Card className="login-card">
              <H3 className="login-title">创建新用户</H3>
              <div className="login-control">
                <FormGroup label="邮箱或全名">
                  <InputGroup
                    large
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="login-control">
                <FormGroup label="密码">
                  <InputGroup
                    large
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="login-control login-button__container">
                <Button
                  large
                  className="login-button"
                  intent="success"
                  type="submit"
                >
                  注册
                </Button>
              </div>
              <div className="register-button__container">
                已有账户？
                <a href="/login">登录</a>
              </div>
            </Card>
          </Form>
        )}
      />
    </Page>
  );
};

Join.getInitialProps = async ctx => {
  return {};
};

export default Join;
