import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Col,
  Menu,
  Input,
  Icon,
  Dropdown,
  Layout,
  Avatar
} from 'antd';
import { HTMLAttributes } from 'enzyme';

type Sidebar = {
  isCollapsed: boolean;
};

type State = Sidebar;

const SearchInput: React.SFC = () => (
  <div className="header-search-container">
    <Icon type="search" className="header-search-icon" />
    <Input
      placeholder="Search for characters"
      className="header-search-input"
    />
  </div>
);

const HeaderMenuNav: React.SFC = () => (
  <Menu mode="horizontal" className="header-menu">
    <Menu.Item className="header-menu-item">Characters</Menu.Item>
    <Menu.Item className="header-menu-item">Contact</Menu.Item>
    <Menu.Item className="header-menu-item">Login</Menu.Item>
  </Menu>
);

const HeaderLogo: React.SFC<HTMLAttributes> = ({ ...rest }) => (
  <div className="header-logo-container">
    <h2 className="header-logo-title">Logo</h2>
    <Icon {...rest} className="header-logo-menu" />
  </div>
);

const dropDownMenu = (
  <Menu className="header-menu-dropdown">
    <Menu.Item className="header-menu-item">Characters</Menu.Item>
    <Menu.Item className="header-menu-item">Contact</Menu.Item>
    <Menu.Item className="header-menu-item">Login</Menu.Item>
  </Menu>
);

const SidebarHead: React.SFC = () => (
  <React.Fragment>
    <div className="sidebar-header">
      <h1 className="sidebar-header-h1">Profile</h1>
    </div>
    <div className="sidebar-profile">
      <Avatar size={70} icon="user" />
      <h2 className="sidebar-profile-h2">MarvelFan_102</h2>
    </div>
  </React.Fragment>
);

const SidebarMenu: React.SFC = () => (
  <Menu mode="inline">
    <Menu.Item key="1" className="sidebar-menu-item">
      <Icon type="user" />
      <span>nav 1</span>
    </Menu.Item>
    <Menu.Item key="2" className="sidebar-menu-item">
      <Icon type="video-camera" />
      <span>nav 2</span>
    </Menu.Item>
    <Menu.Item key="3" className="sidebar-menu-item">
      <Icon type="upload" />
      <span>nav 3</span>
    </Menu.Item>
  </Menu>
);

const Sidebar: React.SFC<Sidebar> = ({ isCollapsed }) => (
  <Layout.Sider
    trigger={null}
    collapsible
    collapsed={isCollapsed}
    collapsedWidth={0}
    className="sidebar"
  >
    <SidebarHead />
    <SidebarMenu />
  </Layout.Sider>
);

export class Header extends React.Component<{}, State> {
  state: State = {
    isCollapsed: true
  };

  onCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  };

  render() {
    const { isCollapsed } = this.state;

    return (
      <Layout>
        <Sidebar isCollapsed={isCollapsed} />
        <Layout>
          <header>
            <Row className="header-root">
              <Col md={6} xs={12} className="header-col">
                <HeaderLogo
                  type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.onCollapsed}
                />
              </Col>
              <Col md={18} xs={12} className="header-col">
                <SearchInput />
                <Dropdown trigger={['click']} overlay={dropDownMenu}>
                  <FontAwesomeIcon
                    icon={faBars}
                    className="menu-bar-icon"
                  />
                </Dropdown>
                <HeaderMenuNav />
              </Col>
            </Row>
          </header>
        </Layout>
      </Layout>
    );
  }
}
