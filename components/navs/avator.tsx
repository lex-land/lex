import { Classes, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { Avator } from '@components/users';
import React from 'react';
import { User } from '@server/user/user.entity';

export const AvatorNav = (user: User) => {
  return (
    <div className="avator__container">
      <Popover
        content={
          <div>
            <Menu>
              <li className={Classes.MENU_HEADER}>
                <h6 className={Classes.HEADING}>切换</h6>
              </li>
              {user.joinedOrganizations
                .concat(user.ownedOrganizations)
                .map(org => (
                  <MenuItem
                    href={`/organizations/${org.name}`}
                    icon="dot"
                    key={org.id}
                    text={org.name}
                  />
                ))}
              <MenuItem href="/organizations" icon="people" text="管理组织" />
              <MenuItem href="/organizations/new" icon="plus" text="添加组织" />
            </Menu>
          </div>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Avator thumbnail user={user} />
      </Popover>
    </div>
  );
};
