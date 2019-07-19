import { Classes, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { Avator } from '@/components/Avator';
import Link from 'next/link';
import React from 'react';
import { User } from '@/interfaces/User';
import cx from 'classnames';
import httpHelper from '@/helpers/httpHelper';
import styled from 'styled-components';
import { useAsyncFn } from 'react-use';

const NavMenu = styled(Menu)`
  .bp3-menu-divider {
    border: 0;
    margin-left: -5px;
    margin-right: -5px;
    background-image: linear-gradient(
      90deg,
      rgba(16, 22, 26, 0) 0,
      rgba(16, 22, 26, 0.15) 20%,
      rgba(16, 22, 26, 0) 100%
    );
    height: 1px;
    padding: 0;
  }
`;

const Container = styled.div`
  margin: 24px 0;
`;

const defaultUser = {
  fullname: '',
  joinedOrganizations: [],
  ownedOrganizations: [],
};

export const DashboardSwitcher = ({ name }: { name: string }) => {
  const [{ value: sessionUser, loading }, fetchSession] = useAsyncFn(() =>
    httpHelper.get<User>(`/api/session/user`),
  );
  const user = sessionUser || defaultUser;
  const orgs = [...user.joinedOrganizations, ...user.ownedOrganizations];
  const skeletonClass = cx({
    [Classes.SKELETON]: loading,
  });

  return (
    <Container>
      <Popover
        content={
          <NavMenu>
            <li className={Classes.MENU_HEADER}>
              <h6 className={Classes.HEADING}>Switch dashboard context</h6>
            </li>
            <MenuItem
              className={skeletonClass}
              href="/"
              icon="user"
              text={user.fullname}
            />
            {orgs.map(org => (
              <MenuItem
                key={org.id}
                className={skeletonClass}
                href={`/orgs/${encodeURIComponent(org.name)}`}
                icon="people"
                text={org.name}
              />
            ))}
            <Menu.Divider />
            {orgs.length > 0 && (
              <>
                <Link href="/orgs">
                  <MenuItem icon="cog" text="Manage orgnizations" />
                </Link>
                <Menu.Divider />
              </>
            )}
            <Link href="/orgs/new">
              <MenuItem icon="plus" text="Create orgnization" />
            </Link>
          </NavMenu>
        }
        onOpened={fetchSession}
        position={Position.BOTTOM_LEFT}
      >
        <Avator arrow label={name} text={name} />
      </Popover>
    </Container>
  );
};
