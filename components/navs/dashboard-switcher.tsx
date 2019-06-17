import { Classes, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { Avator } from '../avator';
import { http } from '@helpers/fetch';
import styled from 'styled-components';
import { useAsync } from '@helpers/hooks';

const defaultUser = {
  fullname: '-',
  joinedOrganizations: [],
  ownedOrganizations: [],
};

const Container = styled.div`
  margin: 24px 0;
`;

export const DashboardSwitcher = ({ name }: { name: string }) => {
  const { value: user = defaultUser } = useAsync(() =>
    http.get(`/api/session/user`),
  );
  const orgs = user.joinedOrganizations.concat(user.ownedOrganizations);
  return (
    <Container>
      <Popover
        content={
          <Menu>
            <li className={Classes.MENU_HEADER}>
              <h6 className={Classes.HEADING}>切换视图</h6>
            </li>
            <Menu.Divider />
            <Fragment>
              <MenuItem href="/" icon="person" text={user.fullname} />
              {orgs.map((org: any) => (
                <MenuItem
                  href={`/orgs/${encodeURIComponent(org.name)}`}
                  icon="people"
                  key={org.id}
                  text={org.name}
                />
              ))}
              <Menu.Divider />
            </Fragment>
            {orgs.length > 0 && (
              <Fragment>
                <MenuItem href="/orgs" icon="cog" text="管理组织" />
                <Menu.Divider />
              </Fragment>
            )}
            <MenuItem href="/orgs/new" icon="plus" text="添加组织" />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Avator arrow label={name} text={name} />
      </Popover>
    </Container>
  );
};
