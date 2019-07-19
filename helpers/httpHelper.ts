import { API_URL } from '@/config/apiUrl';
import { createHttpUtil } from '@/shared/httpUtil';
import { createTokenUtil } from '@/helpers/tokenHelper';

// if (catchedCode.map(Number).includes(result.status)) {
//   throw new FetchError(result.status);
// }

const httpHelper = createHttpUtil({
  url: API_URL,
  token: createTokenUtil().get(),
});

export default httpHelper;
