import './login.less';
import { Button, Card, FormGroup, H3, InputGroup } from '@blueprintjs/core';
import { Form, Formik, FormikActions } from 'formik';
import React from 'react';
import { ValidationError } from 'class-validator';
import { login } from '@helpers/service';
import { route } from '@helpers/next-routes';

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
  } else {
    route().replaceMerge({});
  }
};

export const LoginForm = ({
  title,
  footer,
}: {
  title?: string;
  footer?: any;
}) => {
  return (
    <Formik
      initialValues={loginValue}
      onSubmit={handleSubmit}
      render={formik => (
        <Form className="login-form">
          <Card className="login-form__card">
            {title && <H3 className="login-form__title">{title}</H3>}
            <div>
              <div className="login-form__control">
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
              <div className="login-form__control">
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
              <div className="login-form__control">
                <Button large intent="primary" type="submit">
                  登录
                </Button>
              </div>
            </div>
            {footer}
          </Card>
        </Form>
      )}
    />
  );
};
