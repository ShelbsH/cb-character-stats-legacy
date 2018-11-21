import React from "react";
import { hot } from "react-hot-loader";
import { Header } from "app/components/Header";

//TODO: Create routes here

const App: React.SFC = () => (
  <React.Fragment>
    <Header />
  </React.Fragment>
);

export default hot(module)(App);
