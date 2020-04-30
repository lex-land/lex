import { createEntityFn } from '@/helpers/entityHelper';
import { flow } from 'lodash';
import { passwdTransfer } from './passwdTransfer';

const defaultValue = {
  fullname: '',
  email: '',
  password: '',
};

const createUser = createEntityFn<typeof defaultValue>('user');

export const register = flow(passwdTransfer, createUser);
