import md5 from 'md5';

export const passwdTransfer = (values: { password: string }) => ({
  ...values,
  password: values.password && md5(values.password),
});
