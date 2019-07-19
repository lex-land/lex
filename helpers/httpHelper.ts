import { API_URL } from '@/config/apiUrl';
import { catchedCode } from '@/config/catchedCode';
import { createHttpUtil } from '@/shared/httpUtil';
import { createTokenUtil } from '@/helpers/tokenHelper';

const httpHelper = createHttpUtil({
  url: API_URL,
  token: createTokenUtil().get(),
  catchedCode: catchedCode,
});

export default httpHelper;
