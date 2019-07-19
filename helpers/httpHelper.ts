import { API_URL } from '@/config/apiUrl';
import { Des } from './secureHelper';
import { catchedCode } from '@/config/catchedCode';
import { createHttpUtil } from '@/shared/httpUtil';
import { createTokenUtil } from './tokenHelper';

const httpHelper = createHttpUtil({
  url: API_URL,
  token: createTokenUtil().get(),
  catchedCode: catchedCode,
  csrfTokenFrom: async () => {
    // https://zhuanlan.zhihu.com/p/22521378
    // return sessionStorage.getItem(Des.encrypt('csrfToken')) || '';
    return Des.encrypt('lex');
  },
  // 来自session
});

export default httpHelper;
