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
import Link from 'next/link';
import { http } from '@helpers/fetch';
import styled from 'styled-components';
import { useAsync } from 'react-use';

const defaultUser = {
  fullname: '-',
  joinedOrganizations: [],
  ownedOrganizations: [],
};

const NavMenu = styled(Menu)`
  .bp3-menu-divider {
    border: 0;
    margin-left: -5px;
    margin-right: -5px;
    /* margin-bottom: 16px; */
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

export const DashboardSwitcher = ({ name }: { name: string }) => {
  const { value: user = defaultUser } = useAsync(() =>
    http.get(`/api/session/user`),
  );
  const orgs = user.joinedOrganizations.concat(user.ownedOrganizations);
  return (
    <Container>
      <Popover
        content={
          <NavMenu className="dashboard-switcher__menu">
            <li className={Classes.MENU_HEADER}>
              <h6 className={Classes.HEADING}>Switch dashboard context</h6>
            </li>
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
            <MenuItem href="/orgs/new" icon="plus" text="Create orgnization" />
          </NavMenu>
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
  itemHref: (record: any) => string;
}) => {
  return (
    <UL style={{ listStyle: 'none', padding: 0 }}>
      {dataSource.map((record: any) => (
        <DashboardNavListItem key={record.id}>
          <Link href="/repositories/[repository_id]" as={itemHref(record)}>
            <a className="link">
              {icon && <Icon className="icon" icon={icon} />}
              <span className="name">{record.name}</span>
            </a>
          </Link>
        </DashboardNavListItem>
      ))}
    </UL>
  );
};

export const Dashboard = {
  Switcher: DashboardSwitcher,
  Navlist: DashboardNavlist,
};
