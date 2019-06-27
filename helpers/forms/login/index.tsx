import React, { Fragment } from 'react';
import { Field } from 'components/forms/Field';
import { QuickForm } from '@components/forms';
import { login } from '@helpers/service';
import { route } from '@helpers/route';
import styled from 'styled-components';

const PasswordComponet = styled(Field.Input)`
  /* margin: 30px 0 60px 0; */
`;

export const LoginForm = () => {
  return (
    <QuickForm
      action={values => login(values)}
      render={() => (
        <Fragment>
          <Field.Input large name="username" />
          {/* <Field.Input large name="username" /> */}
          <PasswordComponet large name="password" type="password" />
          {/* <SelectField large name="dd" options={['1', '2']} /> */}
          {/*  */}
        </Fragment>
      )}
      success={() =>
        route()
          .merge()
          .replace()
      }
      submitButton={{ text: '登录', large: true }}
    />
  );
};
