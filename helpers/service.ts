import { Intent, Position, Toaster } from '@blueprintjs/core';
import { cleanToken, setToken } from './secure';
import { useEffect, useState } from 'react';
import { http } from './fetch';
import md5 from 'md5';
import { throttle } from 'lodash';

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

export const session = {
  user: () => http.get(`/api/session/user`),
  isSigned: () =>
    http
      .get(`/api/session`)
      .then(({ statusCode }) => statusCode !== 401)
      .catch(() => false),
};

export const createThrottled = (fn: any) => throttle(fn, 3000);

export const throttledUpdateMod = createThrottled((modId: number, mod: any) => {
  http.put(`/api/module/${modId}`, mod);
});

export const throttledUpdateInte = createThrottled(
  (inteId: number, inte: any) => {
    http.put(`/api/interface/${inteId}`, inte);
  },
);

export const throttledUpdateRepo = createThrottled((id: number, repo: any) =>
  http.put(`/api/repository/${id}`, repo),
);

export const useEntity = (entity: any, curd?: (newValue: any) => any) => {
  const [entityValue, setEntityValue] = useState(entity);
  const setValue = (newValue: Partial<any>) => {
    curd && curd(newValue);
    setEntityValue({ ...entityValue, ...newValue });
  };
  useEffect(() => setEntityValue(entity), [entity, entity.id]);
  return { value: entityValue, setValue };
};
