import {
  Classes,
  Icon,
  IconName,
  Menu,
  MenuItem,
  Popover,
  Position,
  UL,
} from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { Avator } from '@components/avator';
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
              <h6 className={Classes.HEADING}>Switch dashboard context</h6>
            </li>
            <Menu.Divider />
            <Fragment>
              <MenuItem href="/" icon="user" text={user.fullname} />
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
                <MenuItem href="/orgs" icon="cog" text="Manage orgnizations" />
                <Menu.Divider />
              </Fragment>
            )}
            <MenuItem href="/orgs/new" icon="plus" text="Create orgnizations" />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
      >
        <Avator arrow label={name} text={name} />
      </Popover>
    </Container>
  );
};

const DashboardNavListItem = styled.li`
  margin: 8px 0;
  .link {
    font-weight: 500;
    font-size: 15px;
  }
  .icon {
    color: ${props => props.theme.colors.secondary};
  }
  .name {
    margin-left: 5px;
  }
`;

export const DashboardNavlist = ({
  dataSource,
  icon,
  itemHref,
}: {
  dataSource: any;
  icon: IconName;
  itemHref?: (record: any) => string;
}) => {
  return (
    <UL style={{ listStyle: 'none', padding: 0 }}>
      {dataSource.map((record: any) => (
        <DashboardNavListItem key={record.id}>
          <a className="link" href={itemHref && itemHref(record)}>
            {icon && <Icon className="icon" icon={icon} />}
            <span className="name">{record.name}</span>
          </a>
        </DashboardNavListItem>
      ))}
    </UL>
  );
};

export const Dashboard = {
  Switcher: DashboardSwitcher,
  Navlist: DashboardNavlist,
};
