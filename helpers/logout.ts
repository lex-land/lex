import { createTokenUtil } from '@/core/TokenUtil';

const tokenHelper = createTokenUtil();

export const logout = () => tokenHelper.clear();
