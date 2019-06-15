import './index.less';
import { Link } from '@helpers/next-routes';
import React from 'react';

export const Logo = ({ size = 45 }: { size?: number }) => {
  return (
    <Link route="/">
      <svg
        className="logo"
        viewBox="0 0 1119 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1683"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        fill="currentColor"
      >
        <path
          d="M771.334366 0L412.621915 764.898807h615.948264l90.657437 259.101193H0L439.763184 0"
          p-id="1684"
          data-spm-anchor-id="a313x.7781069.0.i1"
          className="selected"
        />
        <path
          d="M867.774479 297.154932L744.193096 556.72247h207.709992l-84.128609-259.567538"
          p-id="1685"
        />
      </svg>
    </Link>
  );
};
