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
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { logout } from '@/helpers/logout';

export const PageNavbar = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const user = Object.assign({ fullname: '-' });
  return (
    <Navbar className={Classes.DARK + ' ' + className}>
      {children || (
        <Fragment>
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
                    <h6 className={Classes.HEADING}>
                      Signed in as {user.fullname}
                    </h6>
                  </li>
                  <Link
                    href={`/users/[user_id]`}
                    as={`/users/${user.fullname}`}
                  >
                    <MenuItem text="Your profile" />
                  </Link>
                  <Link
                    href={`/users/[user_id]/repositories`}
                    as={`/users/${user.fullname}/repositories`}
                  >
                    <MenuItem text="Your repositories" />
                  </Link>
                  <MenuDivider />
                  <Link href={`/settings`}>
                    <MenuItem text="Settings" />
                  </Link>
                  <Link href="/login">
                    <MenuItem text="Sign out" onClick={logout} />
                  </Link>
                </Menu>
              }
              position={Position.BOTTOM_RIGHT}
            >
              <Button minimal icon="user" rightIcon="caret-down" />
            </Popover>
          </NavbarGroup>
        </Fragment>
      )}
    </Navbar>
  );
};
