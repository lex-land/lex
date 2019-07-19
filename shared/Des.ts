import CryptoJS from 'crypto-js';

const OPTIONS = { Key: '-', Iv: '-' };

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
