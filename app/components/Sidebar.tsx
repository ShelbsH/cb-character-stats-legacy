import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Icon, Avatar } from 'antd';

type SidebarProps = {
  isCollapsed: boolean;
};

type Props = SidebarProps;

const SidebarHead: React.SFC = () => (
  <Layout>
    <div className="sidebar-header">
      <h1 className="sidebar-header-h1">Profile</h1>
    </div>
    <div className="sidebar-profile">
      <Avatar size={70} icon="user" />
      <h2 className="sidebar-profile-h2">MarvelFan_102</h2>
    </div>
  </Layout>
);

const SidebarMenu: React.SFC = () => (
  <Menu mode="inline">
    <Menu.Item key="1" className="sidebar-menu-item">
      <Link to="/Add_Character" className="sidebar-menu-item-link">
        <span>
          <Icon type="user" />
          Add Character
        </span>
      </Link>
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

export class Sidebar extends React.Component<Props> {
  render() {
    const { isCollapsed } = this.props;
    return (
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
  }
}
