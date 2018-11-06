import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "app/components/app";
import "styles/app.scss";

const client = new ApolloClient({
  uri: `http://localhost:3000/graphql`
});

const RootApp: React.SFC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<RootApp />, document.getElementById("root"));
});
