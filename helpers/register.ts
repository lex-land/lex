import { createEntityFn } from '@/shared/entityUtil';
import { flow } from 'lodash';
import { passwdTransfer } from './passwdTransfer';

const defaultValue = {
  fullname: '',
  email: '',
  password: '',
};

const createUser = createEntityFn<typeof defaultValue>('user');

export const register = flow(
  passwdTransfer,
  createUser,
);
