import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { login } from '@helpers/service';
import { route } from '@helpers/route';

export const LoginForm = () => {
  return (
    <QuickForm
      controlLarge
      action={values => login(values)}
      fields={Object.keys({
        username: '',
        password: '',
      })}
      success={() =>
        route()
          .merge()
          .replace()
      }
      submitButton={{ text: 'Log In' }}
    />
  );
};
