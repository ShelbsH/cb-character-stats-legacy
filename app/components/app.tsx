import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Header } from 'app/components/Header';
import Home from 'app/components/views/Home';
import { AddCharacterProfile } from 'app/components/views/AddCharacterProfile';
import { Sidebar } from 'app/components/Sidebar';
import { Layout } from 'antd';

const Body: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Add_Character" component={AddCharacterProfile} />
  </Switch>
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
    const { hideSidebar } = this.state;
    return (
      <Layout className="rootLayout">
        <Sidebar isCollapsed={hideSidebar} />
        <Layout>
          <Header
            hideSidebar={this.onCollapsed}
            isCollapsed={hideSidebar}
          />
          <Body />
        </Layout>
      </Layout>
    );
  }
}

export default hot(module)(App);
