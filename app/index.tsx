import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import App from 'app/components/App';
import 'styles/app.scss';

const url = 'http://localhost:3000/graphql';

const link = new HttpLink({
  uri: url,
  credentials: 'same-origin'
});

const uploadLink = new createUploadLink({
  uri: url
});

const client = new ApolloClient({
  link: ApolloLink.from([uploadLink, link]),
  cache: new InMemoryCache()
});

const RootApp: React.SFC = () => (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<RootApp />, document.getElementById('root'));
});
