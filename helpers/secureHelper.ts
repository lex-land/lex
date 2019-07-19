import { DES_IV, DES_KEY, IS_ENCRYPTED, MD5_KEY } from '@/config/encrypt';
import { createDes } from '@/shared/Des';
import md5 from 'md5';

export const Des = createDes({
  Key: DES_KEY,
  Iv: DES_IV,
});

// admin
// UDuNlDebtWg=
export const passwordEncode = (p: string) => decodeURIComponent(Des.encrypt(p));

export const signEncode = (form: any) => {
  if (!MD5_KEY) {
    throw new Error('请检查.env环境变量配置文件！no md5Key');
  }
  const key = MD5_KEY;
  const { params, timeStamp, randomNum } = form;
  return md5(params + IS_ENCRYPTED + timeStamp + randomNum + md5(key));
};

export const paramsEncode = (params: object) => {
  const paramsString = JSON.stringify(params);
  if (IS_ENCRYPTED) {
    return Des.encrypt(paramsString);
  }
  return paramsString;
};
