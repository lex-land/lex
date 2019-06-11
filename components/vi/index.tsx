import './index.less';
import { Link } from '@helpers/next-routes';
import React from 'react';

export const Logo = () => {
  return (
    <Link route="/">
      <span className="logo">Lex</span>
    </Link>
  );
};
