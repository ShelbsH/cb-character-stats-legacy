import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Menu, Input, Icon, Dropdown } from 'antd';

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

const dropDownMenu = (
  <Menu className="header-menu-dropdown">
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
          <Col
            lg={6}
            xl={6}
            md={6}
            sm={12}
            xs={12}
            className="header-col"
          >
            <div className="header-logo-container">
              <h2 className="header-logo-title">Logo</h2>
              <Icon type="menu-fold" className="header-logo-menu" />
            </div>
          </Col>
          <Col
            lg={18}
            xl={18}
            md={18}
            sm={12}
            xs={12}
            className="header-col"
          >
            <SearchInput />
            <Dropdown trigger={['click']} overlay={dropDownMenu}>
              <FontAwesomeIcon
                icon={faBars}
                className="menu-bar-icon"
              />
            </Dropdown>
            <HeaderNav />
          </Col>
        </Row>
      </header>
    );
  }
}
