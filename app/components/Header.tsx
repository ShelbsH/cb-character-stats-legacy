import React from "react";
import { Row, Col, Menu, Input, Icon } from "antd";

const SearchInput: React.SFC = () => (
  <div className="header-search-container">
    <Icon type="search" className="header-search-icon" />
    <Input
      placeholder="Search for characters"
      className="header-search-input"
    />
  </div>
);

const HeaderNav: React.SFC = () => (
  <Menu mode="horizontal" className="header-menu">
    <Menu.Item className="header-menu-item">Characters</Menu.Item>
    <Menu.Item className="header-menu-item">Contact</Menu.Item>
    <Menu.Item className="header-menu-item">Login</Menu.Item>
  </Menu>
);

export class Header extends React.Component {
  render() {
    return (
      <header>
        <Row className="header-root">
          <Col span={6} className="header-col">
            <div className="header-logo-container">
              <h2 className="header-logo-title">CB Character Stats</h2>
              <Icon type="menu-fold" className="header-logo-menu" />
            </div>
          </Col>
          <Col span={18} className="header-col">
            <SearchInput />
            <HeaderNav />
          </Col>
        </Row>
      </header>
    );
  }
}
