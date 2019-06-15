import './index.less';
import {
  Button,
  Card,
  Classes,
  FormGroup,
  H3,
  InputGroup,
  Navbar,
  NavbarGroup,
} from '@blueprintjs/core';
import { Form, Formik, FormikActions } from 'formik';
import { Link } from '@helpers/next-routes';
import { Logo } from '@components/vi';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { ValidationError } from 'class-validator';
import { login } from '@helpers/service';

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

const handleSubmit = async (
  values: LoginValue,
  formikActions: FormikActions<LoginValue>,
) => {
  const { error, message } = await login(values);
  if (error) {
    const errorMsg: ValidationError[] = message;
    errorMsg.forEach(e => {
      formikActions.setFieldError(e.property, Object.values(e.constraints)[0]);
    });
  }
};

const Login: NextSFC = () => {
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
                <Link route="join">
                  <Button style={{ marginLeft: 8 }} intent="success">
                    注册
                  </Button>
                </Link>
              </NavbarGroup>
            </Navbar>
            <Card className="login-card">
              <H3 className="login-title">登录 Lex</H3>
              <div className="login-control">
                <FormGroup
                  intent={formik.errors.username ? 'danger' : 'none'}
                  label="邮箱或全名"
                  helperText={formik.errors.username}
                >
                  <InputGroup
                    large
                    intent={formik.errors.username ? 'danger' : 'none'}
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="login-control">
                <FormGroup
                  intent={formik.errors.password ? 'danger' : 'none'}
                  label="密码"
                  helperText={formik.errors.password}
                >
                  <InputGroup
                    large
                    intent={formik.errors.password ? 'danger' : 'none'}
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="login-control login-button__container">
                <Button
                  large
                  className="login-button"
                  intent="primary"
                  type="submit"
                >
                  登录
                </Button>
              </div>
              <div className="register-button__container">
                还没有一个账户？
                <Link route="join">
                  <a>创建新用户</a>
                </Link>
              </div>
            </Card>
          </Form>
        )}
      />
    </Page>
  );
};

Login.getInitialProps = async ctx => {
  if (await ctx.authorized()) {
    return ctx.redirect('/');
  }
  return {};
};

export default Login;
