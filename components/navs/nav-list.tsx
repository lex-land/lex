import { Menu, MenuItem } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import React from 'react';
import { useQuery } from '@helpers/hooks';

export const NavList = ({
  dataSource,
  rowKey,
  itemRoute,
  itemLinkReplace,
  itemIcon,
}: any) => {
  const query = useQuery();
  return (
    <Menu className="nav-list">
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
          <MenuItem
            icon={itemIcon}
            active={+query[rowKey] === +menu.id}
            text={menu.name}
          />
        </Link>
      ))}
    </Menu>
  );
};
