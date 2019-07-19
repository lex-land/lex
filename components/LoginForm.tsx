import { Button, Intent, Position, Toaster } from '@blueprintjs/core';
import { KEYOF_TOKEN, createTokenUtil } from '@/helpers/tokenHelper';
import { QuickForm } from '@/shared/QuickForm';
import React from 'react';
import { login } from '@/helpers/login';
import { useRouter } from 'next/router';

const tokenHelper = createTokenUtil();

const defaultValue = { username: '', password: '' };

export const LoginForm = () => {
  const router = useRouter();

  const onSuccess = (values: typeof defaultValue, json: any) => {
    tokenHelper.set(json[KEYOF_TOKEN]);
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: '登录成功',
    });
    router.reload();
  };

  return (
    <QuickForm
      defaultValue={defaultValue}
      action={login}
      render={() => (
        <>
          <QuickForm.Input large name="username" />
          <QuickForm.Input large name="password" type="password" />
          <Button intent="primary" type="submit" large text="Log In" />
        </>
      )}
      success={onSuccess}
    />
  );
};
