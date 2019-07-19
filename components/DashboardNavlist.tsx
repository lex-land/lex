import { Icon, IconName, UL } from '@blueprintjs/core';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
  itemAs,
}: {
  dataSource: any;
  icon: IconName;
  itemHref: string;
  itemAs: (record: any) => string;
}) => {
  return (
    <UL style={{ listStyle: 'none', padding: 0 }}>
      {dataSource.map((record: any) => (
        <DashboardNavListItem key={record.id}>
          <Link href={itemHref} as={itemAs(record)}>
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
