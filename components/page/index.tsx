import {
  Alignment,
  AnchorButton,
  Card,
  Classes,
  H3,
  IconName,
  InputGroup,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NonIdealState,
  Popover,
  Position,
} from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { Avator } from '../avator';
import { Flex } from '../layout/flex';
import Head from 'next/head';
import { Logo } from '@components/vi';
import { Router } from '@helpers/next-routes';
import { http } from '@helpers/fetch';
import { logout } from '@helpers/service';
import styled from 'styled-components';
import { useAsync } from '@helpers/hooks';

export interface PageProps {
  className?: string;
  title?: string;
  children: any;
  style?: React.CSSProperties;
  backgroundColor?: string;
}

const ErrorContainer = styled(Flex.Auto)`
  .title {
  }
  .h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-size: 72px;
    font-weight: 800;
    line-height: 72px;
  }
  .description {
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
  }
`;

interface ErrorProps {
  icon?: IconName;
  code: number;
  className?: string;
  description?: string;
  action?: any;
}

const PageError = ({ code, description, action, className }: ErrorProps) => (
  <ErrorContainer className={className}>
    <h1 className="h1">{code}</h1>
    {description && <div className="description">{description}</div>}
    {action && <div className="action">{action}</div>}
  </ErrorContainer>
);

const EmberedError = ({ code, icon, className }: ErrorProps) => (
  <ErrorContainer className={className}>
    <NonIdealState icon="geosearch" />
    <br />
    <div className="description">抱歉，此功能还在开发中</div>
    <AnchorButton onClick={Router.back} intent="primary" minimal>
      回到上页
    </AnchorButton>
  </ErrorContainer>
);

let user = { fullname: '-' };
const AvatorBar = () => {
  const { value: session } = useAsync(() => http.get(`/api/session`));
  user = Object.assign(user, session);
  return (
    <Popover
      content={
        <Menu>
          <li className={Classes.MENU_HEADER}>
            <h6 className={Classes.HEADING}>{user.fullname}已登录</h6>
          </li>
          <MenuItem text="账户" href={`/users/${user.fullname}`} />
          <MenuItem text="仓库" href={`/users/${user.fullname}/repositories`} />
          <MenuDivider />
          <MenuItem href="https://github.com/sunmi-web/lex/" text="源代码" />
          <MenuItem text="设置" href={`/users/${user.fullname}/settings`} />
          <MenuItem text="退出登录" onClick={logout} href="/login" />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Avator arrow text={user.fullname} />
    </Popover>
  );
};

const WrappedNavbar = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Navbar className={Classes.DARK + ' ' + className}>
      {children || (
        <Fragment>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>
              <Logo size={30} />
            </NavbarHeading>
            <InputGroup
              leftIcon="search"
              placeholder="全局搜索，正在开发中..."
            />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <AvatorBar />
          </NavbarGroup>
        </Fragment>
      )}
    </Navbar>
  );
};

export const Page = Object.assign(
  (props: PageProps) => {
    return (
      <main className={props.className} style={props.style}>
        <Head>
          <title>{props.title || 'Lex-接口文档管理'}</title>
          <style>{`body{ background:${props.backgroundColor ||
            '#f5f8fa'} }`}</style>
        </Head>
        {props.children}
      </main>
    );
  },
  {
    EmberedError: styled(EmberedError)`
      padding: 40px;
      text-align: center;
    `,
    Error: styled(PageError)`
      text-align: center;
    `,
    UnlogedNavbar: styled(WrappedNavbar)`
      height: 100px;
      .bp3-navbar-group {
        height: 100px;
        align-items: flex-end;
        padding-bottom: 24px;
        float: none;
      }
    `,
    Navbar: styled(WrappedNavbar)`
      padding: 0 24px;
    `,
    // 内容块
    Content: styled(Flex.Auto)`
      padding: 24px;
    `,
    Card: Object.assign(
      styled(Card)`
        width: 400px;
        padding: 40px 24px 24px;
        margin: 80px auto;
        .bp3-button[type='submit'] {
          width: 100%;
          margin-top: 16px;
        }
        .bp3-label {
          font-weight: bold;
        }
      `,
      {
        Title: styled(H3)`
          margin-bottom: 24px;
          text-align: center;
        `,
        Footer: styled.div`
          margin-top: 16px;
          text-align: center;
        `,
      },
    ),
  },
);