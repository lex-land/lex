import { createEntityFn } from '@/helpers/entityHelper';
import { flow } from 'lodash';
import { passwdTransfer } from './passwdTransfer';

const loginValue = {
  username: '',
  password: '',
};

type LoginValue = typeof loginValue;

const createSession = createEntityFn<LoginValue>('session');

export const login = flow(passwdTransfer, createSession);
