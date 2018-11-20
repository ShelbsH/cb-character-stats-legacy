import React from "react";
import { hot } from "react-hot-loader";
import { Main } from "app/components/main";
import { Header } from "app/components/Header";

//TODO: Create routes here

const App: React.SFC = () => (
  <React.Fragment>
    <Header />
    <Main message="TypeScript" />
  </React.Fragment>
);

export default hot(module)(App);
