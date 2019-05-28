import { getToken as getCookieToken } from './secure';

let token: string;

export const getToken = () => {
  return token || getCookieToken();
};

export const setToken = (value: string) => {
  token = value;
  return token;
};
