import { createTokenUtil } from '@/shared/tokenUtil';

const tokenHelper = createTokenUtil();

export const logout = () => tokenHelper.clear();
