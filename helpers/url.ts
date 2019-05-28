import { SUNMI_ENV } from '@config/env';
import _ from 'lodash';
import path from 'path';

// const prdURL = {
//   test: `http://shopbi.test.sunmi.com`,
//   uat: `https://shopbi.uat.sunmi.com`,
//   master: `https://shopbi.sunmi.com`,
// };

// const URL = {
//   development: `http://localhost:3000`,
//   production: prdURL[process.env.SUNMI_ENV],
// };

// export const SUNMI_PROD_URL = URL[process.env.NODE_ENV || 'development'];

export function engine(strings: any, ...args: any) {
  const envMap: any = {
    dev: '',
    test: 'http://shopbi-webapi.test.sunmi.com/bank',
    uat: 'https://shopbi-webapi.uat.sunmi.com/bank',
    master: 'https://shopbi-webapi.sunmi.com/bank',
  };
  const base = envMap[SUNMI_ENV || 'master'];
  const pathname = path.join(
    ..._.compact(_.flatMap(_.zip(strings, args.map((i: any) => i.toString())))),
  );
  return `${base}${pathname}`;
}
