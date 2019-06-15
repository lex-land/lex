import { Intent, Position, Toaster } from '@blueprintjs/core';
import { cleanToken, setToken } from './secure';
import { http } from './fetch';
import md5 from 'md5';

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

export const login = async (values: LoginValue) => {
  const { accessToken, error, message } = await http.post(`/api/session`, {
    ...values,
    password: values.password && md5(values.password),
  });
  if (error) {
    return { error, message };
  }
  if (accessToken) {
    setToken(accessToken);
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: '登录成功',
    });
    return { error, message };
  }
  return { error, message };
};

export const logout = () => cleanToken();
