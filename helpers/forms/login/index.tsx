import { Button } from '@blueprintjs/core';
import { Field } from 'components/forms/Field';
import { QuickForm } from '@components/forms';
import React from 'react';
import { login } from '@helpers/service';
import { route } from '@helpers/route';

export const LoginForm = () => {
  return (
    <QuickForm
      action={values => login(values)}
      render={() => (
        <>
          <Field.Input large name="username" />
          <Field.Input large name="password" type="password" />
          <Button intent="primary" type="submit" large text="Log in" />
        </>
      )}
      success={() =>
        route()
          .merge()
          .replace()
      }
    />
  );
};
