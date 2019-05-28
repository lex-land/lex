import './layout.less';
import { Avatar, Col, Dropdown, Icon, Layout, Menu, Row } from 'antd';
import { Des, cleanToken } from '@helpers/secure';
import React, { useState } from 'react';
import { RouterProps, withRouter } from 'next/router';
import { ClickParam } from 'antd/lib/menu';
import Cookies from 'universal-cookie';
import { NextSFC } from 'next';
import menus from '@config/menus.json';
import { route } from '@helpers/next-routes';

const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const handleLogout = () => {
  cleanToken();
  route('login').replace({});
};

const menu = (
  <Menu>
    <Menu.Item>
      <a onClick={handleLogout}>退出登录</a>
    </Menu.Item>
  </Menu>
);

const SunmiSider = withRouter((props: any) => {
  const router: RouterProps = props.router;
  const controller = `/${router.pathname.split('/')[1]}`;
  const selectedKeys = [controller || '/'];

  const [on, setOn] = useState(props.collapsed);
  const toggle = (collapsed: boolean) => {
    const cookie = new Cookies();
    setOn(collapsed);
    cookie.set(Des.encrypt('menu_collapsed'), +collapsed);
  };

  const handleClick = async (e: ClickParam) => {
    router.push(e.key);
  };
  const MenuChildren = menus.map((item: any) => {
    if (!item.children) {
      return (
        <Menu.Item key={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </Menu.Item>
      );
    }
    if (item.children.length) {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </span>
          }
        >
          {item.children.map((child: any) => (
            <Menu.Item key={child.key}>
              <span>{child.name}</span>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    }
  });

  return (
    <Layout className="SunmiSider">
      <Sider
        width={on ? 80 : 236}
        collapsed={on}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="LogoContainer">
          {!on && (
            <img className="logo" src="/static/images/logo-light.svg" alt="" />
          )}
          {on && (
            <Icon
              className="trigger"
              style={{ color: '#fff' }}
              onClick={() => toggle(!on)}
              type={on ? 'menu-unfold' : 'menu-fold'}
            />
          )}
        </div>
        <Menu
          onClick={handleClick}
          selectedKeys={selectedKeys}
          theme="dark"
          mode="inline"
        >
          {MenuChildren}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: on ? 80 : 236 }}>
        <Header className="Layout__Header">
          <Row type="flex" justify="space-between">
            <Col>
              {!on && (
                <Icon
                  className="trigger"
                  onClick={() => toggle(!on)}
                  type={'menu-fold'}
                />
              )}
            </Col>
            <Col>
              <Dropdown overlay={menu}>
                <div className="Avatar">
                  <Avatar>S</Avatar>
                  <span className="name">SUNMI</span>
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        {props.children}
      </Layout>
    </Layout>
  );
});

export function withLayout<P>(Component: (props: P) => any): NextSFC<any, P> {
  const withLayoutComponent: any = (props: any): any => {
    return (
      <SunmiSider collapsed={!!+props.menuCollapsed}>
        <Component {...props} />
      </SunmiSider>
    );
  };
  return withLayoutComponent;
}
