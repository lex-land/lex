import {
  Alignment,
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
import { LexContainer, LexContent } from '@components/layout/container';
import React, { Fragment } from 'react';
import { Avator } from '../avator';
import { Flex } from '../layout/flex';
import { GlobalStyle } from '@config/theme/lex-theme';
import Head from 'next/head';
import { Logo } from '@components/vi';
import _ from 'lodash';
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
  visible?: boolean;
  title?: string;
}

const PageError = ({ code, description, action, className }: ErrorProps) => (
  <ErrorContainer className={className}>
    <h1 className="h1">{code}</h1>
    {description && <div className="description">{description}</div>}
    {action && <div className="action">{action}</div>}
  </ErrorContainer>
);

const EmberedError = ({ className, ...props }: ErrorProps) =>
  props.visible ? (
    <ErrorContainer className={className}>
      <NonIdealState icon={props.icon} />
      <br />
      <div className="description">
        {props.description || '抱歉，当前功能未开发完成'}
      </div>
      {props.action}
    </ErrorContainer>
  ) : null;

const AvatorBar = () => {
  const { value: session } = useAsync(() => http.get(`/api/session`));
  const user = Object.assign({ fullname: '-' }, session);
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
          <MenuItem text="设置" href={`/settings`} />
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

export const Page = _.merge(
  (props: PageProps) => {
    return (
      <main className={props.className} style={props.style}>
        <Head>
          <title>{`Lex-${props.title || '接口文档管理'}`}</title>
          <link href="/stylesheets/main.css" rel="stylesheet" />
        </Head>
        {props.children}
        <GlobalStyle backgroundColor={props.backgroundColor} />
      </main>
    );
  },
  {
    // https://stackoverflow.com/questions/41272375/object-assign-does-not-copy-functions
    // composePageProps: composePageProps,
    // createPageProps: createPageProps,
    Container: LexContainer,
    Sider: styled.aside<{ offset?: number }>`
      min-height: ${props => `calc(100vh - ${props.offset || 64}px)`};
      min-width: 300px;
      padding: 0 24px;
      border-right: 1px solid rgba(16, 22, 26, 0.15);
      background: #fff;
      .bp3-divider {
        border: 0;
        margin-left: -24px;
        margin-right: -24px;
        margin-bottom: 16px;
        background-image: linear-gradient(
          90deg,
          rgba(16, 22, 26, 0) 0,
          rgba(16, 22, 26, 0.15) 20%,
          rgba(16, 22, 26, 0) 100%
        );
        height: 1px;
        padding: 0;
      }
    `,
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
      height: 64px;
      .bp3-navbar-group {
        height: 64px;
      }
    `,
    // 内容块
    Content: LexContent,
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
