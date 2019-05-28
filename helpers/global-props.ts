import { NextAppContext } from 'next/app';
import { getCookie } from './secure';

export const exportGlobalProps = async (ctx: NextAppContext) => {
  return {
    menuCollapsed: getCookie('menu_collapsed', ctx),
  };
};
