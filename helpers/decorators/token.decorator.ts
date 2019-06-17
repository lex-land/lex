import { createParamDecorator } from '@nestjs/common';
import { getToken } from '@helpers/secure';

export const Token = createParamDecorator((data, req) => {
  return getToken({ req });
});
