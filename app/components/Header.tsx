import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Menu, Input, Icon, Dropdown } from 'antd';

type HeaderLogo = React.HTMLAttributes<HTMLElement> & {
  type: string;
};

type IconSidebar = {
  hideSidebar: () => void;
};

type Props = IconSidebar;

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

const HeaderLogo: React.SFC<HeaderLogo> = ({ ...rest }) => (
  <div className="header-logo-container">
    <h2 className="header-logo-title">
      <Link to="/" className="header-logo-link">
        Logo
      </Link>
    </h2>
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

export class Header extends React.Component<Props> {
  render() {
    const { hideSidebar } = this.props;
    return (
      <header>
        <Row className="header-root">
          <Col md={6} xs={12} className="header-col">
            <HeaderLogo
              type={hideSidebar ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.hideSidebar}
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
    );
  }
}
