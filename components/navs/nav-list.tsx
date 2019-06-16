import { Link } from '@helpers/next-routes';
import React from 'react';
import { useQuery } from '@helpers/hooks';

export const NavList = ({
  dataSource,
  rowKey,
  itemRoute,
  itemLinkReplace,
}: any) => {
  const query = useQuery();
  return (
    <div>
      {dataSource.map((menu: any) => (
        <Link
          key={menu.id}
          route={itemRoute}
          params={{
            ...query,
            [rowKey]: menu.id,
          }}
          replace={itemLinkReplace}
        >
          <a>{menu.name}</a>
        </Link>
      ))}
    </div>
  );
};
