import {
  Alignment,
  AnchorButton,
  Button,
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core';
import Link from 'next/link';
import { Logo } from './Logo';
import React from 'react';
import { User } from '@/interfaces/User';
import httpHelper from '@/helpers/httpHelper';
import { logout } from '@/helpers/logout';
import { useAsyncFn } from 'react-use';

export const PageNavbar = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [{ value: sessionUser, loading }, fetchSession] = useAsyncFn(() =>
    httpHelper.get<User>(`/api/session`),
  );
  const user = sessionUser || { fullname: '' };
  const info = user.fullname ? `Signed in as ${user.fullname}` : `checking...`;
  return (
    <Navbar className={`${Classes.DARK} ${className}`}>
      {children || (
        <>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>
              <Logo size={36} />
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Popover
              content={
                <Menu>
                  <MenuItem
                    href="https://github.com/lex-land/lex/"
                    text="Github"
                  />
                  <MenuItem
                    href="https://github.com/lex-land/lex/issues/new"
                    text="New Issue"
                  />
                  <MenuItem
                    href="https://github.com/lex-land/lex/blob/master/README.md"
                    text="About Lex"
                  />
                </Menu>
              }
              position={Position.BOTTOM_RIGHT}
            >
              <Button minimal icon="help" />
            </Popover>
            <Link href="/notifications">
              <AnchorButton minimal icon="notifications" />
            </Link>
            <Popover
              content={
                <Menu>
                  <li className={Classes.MENU_HEADER}>
                    <h6 className={Classes.HEADING}>{info}</h6>
                  </li>
                  <Link
                    href={`/users/[user_id]`}
                    as={`/users/${user.fullname}`}
                  >
                    <MenuItem disabled={loading} text="Your profile" />
                  </Link>
                  <Link
                    href={`/users/[user_id]/repositories`}
                    as={`/users/${user.fullname}/repositories`}
                  >
                    <MenuItem disabled={loading} text="Your repositories" />
                  </Link>
                  <MenuDivider />
                  <Link href={`/settings`}>
                    <MenuItem disabled={loading} text="Settings" />
                  </Link>
                  <Link href="/login">
                    <MenuItem
                      disabled={loading}
                      text="Sign out"
                      onClick={logout}
                    />
                  </Link>
                </Menu>
              }
              onOpened={fetchSession}
              position={Position.BOTTOM_RIGHT}
            >
              <Button minimal icon="user" rightIcon="caret-down" />
            </Popover>
          </NavbarGroup>
        </>
      )}
    </Navbar>
  );
};
