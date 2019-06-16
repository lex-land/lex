import {
  Classes,
  IMenuItemProps,
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';
import { Avator } from '../avator';
import { Link } from '@helpers/next-routes';
import React from 'react';
import { http } from '@helpers/fetch';
import styled from 'styled-components';
import { useAsync } from 'react-use';

const LinkMenuItem = ({
  href,
  params,
  ...props
}: IMenuItemProps & { params?: any }) => {
  return (
    <Link route={href as any} params={{ ...params }}>
      <MenuItem {...props} />
    </Link>
  );
};

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
            <LinkMenuItem href="dashboard" icon="person" text={user.fullname} />
            {orgs.map((org: any) => (
              <MenuItem
                href={`/orgs/${org.name}`}
                icon="people"
                key={org.id}
                text={org.name}
              />
            ))}
            {orgs.length > 0 && <Menu.Divider />}
            {orgs.length > 0 && (
              <LinkMenuItem href="orgs" icon="cog" text="管理组织" />
            )}
            {orgs.length > 0 && <Menu.Divider />}
            <LinkMenuItem href="orgs/new" icon="plus" text="添加组织" />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Avator arrow label={name} text={name} />
      </Popover>
    </Container>
  );
};
