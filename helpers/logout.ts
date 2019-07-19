import { createTokenUtil } from '@/helpers/tokenHelper';

const tokenHelper = createTokenUtil();

export const logout = () => tokenHelper.clear();
