import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Header } from 'app/components/Header';
import { AddCharacter } from 'app/components/view/AddCharacter';
import { SidebarComponent } from 'app/components/Sidebar';
import { Layout } from 'antd';

const Body: React.SFC = () => (
  <Route path="/Add_Character" component={AddCharacter} />
);

type State = {
  hideSidebar: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    hideSidebar: true
  };

  onCollapsed = () => {
    this.setState({
      hideSidebar: !this.state.hideSidebar
    });
  };

  render() {
    return (
      <Layout>
        <SidebarComponent isCollapsed={this.state.hideSidebar} />
        <Layout>
          <Header hideSidebar={this.onCollapsed} />
          <Body />
        </Layout>
      </Layout>
    );
  }
}

export default hot(module)(App);
