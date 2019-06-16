import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { login } from '@helpers/service';
import { route } from '@helpers/next-routes';

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

export const LoginForm = () => {
  return (
    <QuickForm
      controlLarge
      action={values => login(values)}
      fields={Object.keys(loginValue)}
      defaultValue={loginValue}
      success={() => route().replaceMerge({})}
      submitButton={{ text: 'Log In' }}
    />
  );
};
