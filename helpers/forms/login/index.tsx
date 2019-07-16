import { Button } from '@blueprintjs/core';
import { QuickForm } from '@components/forms';
import React from 'react';
import { login } from '@helpers/service';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  const router = useRouter();
  return (
    <QuickForm
      defaultValue={{ username: '', password: '' }}
      action={values => login(values)}
      render={() => (
        <>
          <QuickForm.Input large name="username" />
          <QuickForm.Input large name="password" type="password" />
          <Button intent="primary" type="submit" large text="Log In" />
        </>
      )}
      success={router.reload}
    />
  );
};
