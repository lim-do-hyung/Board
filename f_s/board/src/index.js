import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // Django GraphQL 서버의 엔드포인트 URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);