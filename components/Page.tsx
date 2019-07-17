import {
  Alignment,
  AnchorButton,
  Button,
  Card,
  Classes,
  H3,
  IconName,
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
import { LexContainer, LexContent } from '@/components/layout/container';
import React, { Fragment } from 'react';
import { Flex } from './layout/flex';
import { GlobalStyle } from '@/config/theme/lex-theme';
import Head from 'next/head';
import { Logo } from '@/components/Logo';
import _ from 'lodash';
import constants from '@/config/constants';
import { logout } from '@/helpers/logout';
import styled from 'styled-components';
// import { useAsync } from 'react-use';

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
    color: #394b59;
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

const WrappedNavbar = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  // const { value: session } = useAsync(getSessionUser);
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

export const Page = _.merge(
  (props: PageProps) => {
    const title = props.title || constants.PROJECT_DESCRIPTION;
    return (
      <Fragment>
        <Head>
          <title>{`Lex - ${title}`}</title>
        </Head>
        <main className={props.className} style={props.style}>
          {props.children}
        </main>
        <GlobalStyle backgroundColor={props.backgroundColor} />
      </Fragment>
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
