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
import { http } from '@helpers/fetch';
import { login } from '@helpers/service';
import md5 from 'md5';

const joinValue = {
  fullname: '',
  email: '',
  password: '',
};

type joinValue = typeof joinValue;

const handleSubmit = async (
  values: joinValue,
  formikActions: FormikActions<joinValue>,
) => {
  const { error, message } = await http.post(`/api/user`, {
    ...values,
    password: values.password && md5(values.password),
  });
  if (error) {
    const errorMsg: ValidationError[] = message;
    errorMsg.forEach(e => {
      formikActions.setFieldError(e.property, Object.values(e.constraints)[0]);
    });
  } else {
    await login({ username: values.fullname, password: values.password });
  }
};

const Join: NextSFC = () => {
  return (
    <Page backgroundColor="#e9ebee" className="login">
      <Formik
        initialValues={joinValue}
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
                <FormGroup
                  intent={formik.errors.email ? 'danger' : 'none'}
                  label="邮箱"
                  labelFor="email"
                  helperText={formik.errors.email}
                >
                  <InputGroup
                    large
                    intent={formik.errors.email ? 'danger' : 'none'}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="login-control">
                <FormGroup
                  intent={formik.errors.fullname ? 'danger' : 'none'}
                  label="全名"
                  labelFor="fullname"
                  helperText={formik.errors.fullname}
                >
                  <InputGroup
                    large
                    intent={formik.errors.fullname ? 'danger' : 'none'}
                    id="fullname"
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="login-control">
                <FormGroup
                  intent={formik.errors.password ? 'danger' : 'none'}
                  label="密码"
                  labelFor="password"
                  helperText={formik.errors.password}
                >
                  <InputGroup
                    large
                    intent={formik.errors.password ? 'danger' : 'none'}
                    id="password"
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
                  intent="success"
                  type="submit"
                >
                  注册
                </Button>
              </div>
              <div className="register-button__container">
                已有账户？
                <Link route="login">
                  <a>登录</a>
                </Link>
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
