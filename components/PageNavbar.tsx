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
            <AnchorButton href="/notifications" minimal icon="notifications" />
            <Popover
              content={
                <Menu>
                  <li className={Classes.MENU_HEADER}>
                    <h6 className={Classes.HEADING}>
                      Signed in as {user.fullname}
                    </h6>
                  </li>
                  <MenuItem
                    text="Your profile"
                    href={`/users/${user.fullname}`}
                  />
                  <MenuItem
                    text="Your repositories"
                    href={`/users/${user.fullname}/repositories`}
                  />
                  <MenuDivider />
                  <MenuItem text="Settings" href={`/settings`} />
                  <MenuItem text="Sign out" onClick={logout} href="/login" />
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
