import React from "react";
import { Row, Col, Menu, Input, Icon } from "antd";
import "../styles/components/Header.scss";

export class Header extends React.Component {
  render() {
    const { Item } = Menu;
    return (
      <header>
        <Row className="header-root">
          <Col span={6} className="header-col" />
          <Col span={18} className="header-col">
            <div className="header-search-container">
              <Icon type="search" className="header-search-icon" />
              <Input
                placeholder="Search for characters"
                className="header-search-input"
              />
            </div>
            <Menu mode="horizontal" className="header-menu">
              <Item className="header-menu-item">Characters</Item>
              <Item className="header-menu-item">Contact</Item>
              <Item className="header-menu-item">Login</Item>
            </Menu>
          </Col>
        </Row>
      </header>
    );
  }
}
