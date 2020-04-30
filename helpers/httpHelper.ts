import { API_URL } from '@/config/apiUrl';
import { catchedCode } from '@/config/catchedCode';
import { createHttpUtil } from '@/shared/httpUtil';
import { createTokenUtil } from './tokenHelper';
import md5 from 'md5';

const httpHelper = createHttpUtil({
  url: API_URL,
  token: createTokenUtil().get(),
  catchedCode: catchedCode,
  csrfTokenFrom: async () => {
    // https://zhuanlan.zhihu.com/p/22521378
    return md5('lex');
  },
  // 来自session
});

export default httpHelper;
