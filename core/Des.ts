import CryptoJS from 'crypto-js';
import md5 from 'md5';

const OPTIONS = { Key: '666', Iv: '666' };

const ENV = {
  DES: OPTIONS,
  isEncrypted: 0,
  md5Key: '666',
};

export const createDes = (options: typeof OPTIONS = OPTIONS) => {
  const tripledes = CryptoJS.TripleDES;
  const IV = CryptoJS.enc.Utf8.parse(options.Iv);
  const KEY = CryptoJS.enc.Utf8.parse(options.Key);

  return {
    encrypt(message: string | null) {
      const result = tripledes.encrypt(message || '', KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encodeURIComponent(result as any);
    },
    decrypt(message: string | null) {
      const encryptedMessage: any = {
        ciphertext: CryptoJS.enc.Base64.parse(
          decodeURIComponent(message || ''),
        ),
      };
      const result = tripledes.decrypt(encryptedMessage, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return result.toString(CryptoJS.enc.Utf8);
    },
  };
};

export const Des = createDes(ENV.DES);

// admin
// UDuNlDebtWg=
export const passwordEncode = (p: string) => decodeURIComponent(Des.encrypt(p));

export const signEncode = (form: any) => {
  if (!ENV.md5Key) {
    throw new Error('请检查.env环境变量配置文件！no md5Key');
  }
  const key = ENV.md5Key;
  const { params, timeStamp, randomNum } = form;
  return md5(params + ENV.isEncrypted + timeStamp + randomNum + md5(key));
};

export const paramsEncode = (params: object) => {
  const paramsString = JSON.stringify(params);
  if (ENV.isEncrypted) {
    return Des.encrypt(paramsString);
  }
  return paramsString;
};
