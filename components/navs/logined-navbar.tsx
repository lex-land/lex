import {
  Alignment,
  Classes,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core';
import { Avator } from '@components/users';
import { Logo } from '@components/vi';
import React from 'react';
import { http } from '@helpers/fetch';
import { logout } from '@helpers/service';
import { useAsync } from '@helpers/hooks';

let user = { fullname: '-' };
const AvatorBar = () => {
  const { value: session } = useAsync(() => http.get(`/api/session`));
  user = Object.assign(user, session);
  return (
    <NavbarGroup align={Alignment.RIGHT}>
      <Popover
        content={
          <Menu>
            <li className={Classes.MENU_HEADER}>
              <h6 className={Classes.HEADING}>{user.fullname}已登录</h6>
            </li>
            <MenuItem text="账户" href={`/users/${user.fullname}`} />
            <MenuItem
              text="仓库"
              href={`/users/${user.fullname}/repositories`}
            />
            <MenuDivider />
            <MenuItem href="https://github.com/sunmi-web/lex/" text="源代码" />
            <MenuItem text="设置" href={`/users/${user.fullname}/settings`} />
            <MenuItem text="退出登录" onClick={logout} href="/login" />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Avator minimal user={user} />
      </Popover>
    </NavbarGroup>
  );
};

const LoginedNavbar = () => {
  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Logo size={30} />
        </NavbarHeading>
        <InputGroup leftIcon="search" placeholder="全局搜索，正在开发中..." />
      </NavbarGroup>
      <AvatorBar />
    </Navbar>
  );
};

export default LoginedNavbar;
