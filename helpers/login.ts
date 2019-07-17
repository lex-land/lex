import { createEntityFn } from '@/core/EntityUtil';
import md5 from 'md5';

const createSession = createEntityFn('session');

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

export const login = (values: LoginValue) =>
  createSession({
    ...values,
    password: values.password && md5(values.password),
  });
