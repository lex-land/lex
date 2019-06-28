import { Button } from '@blueprintjs/core';
import { QuickForm } from '@components/forms';
import React from 'react';
import { login } from '@helpers/service';
import { route } from '@helpers/route';

export const LoginForm = () => {
  return (
    <QuickForm
      defaultValue={{ username: '', password: '' }}
      action={values => login(values)}
      render={() => (
        <>
          <QuickForm.Input large name="username" />
          <QuickForm.Input large name="password" type="password" />
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
