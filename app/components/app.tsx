import React from "react";
import { hot } from "react-hot-loader";
import { Main } from "app/components/main";

const App: React.SFC = () => <Main message="TypeScript" />;

export default hot(module)(App);
