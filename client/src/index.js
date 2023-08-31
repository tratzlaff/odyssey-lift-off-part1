import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';

// To install, run 'npm install graphql @apollo/client' in client/ directory.
// graphql provides the core logic for parsing GraphQL queries.
// @apollo/client contains pretty much everything we need to build our client, including an in-memory cache, local state management, and error handling.
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000", // This is the URL of the GraphQL server we want to connect to.
    cache: new InMemoryCache(), // Enables the client to respond to queries for the same data without having to fetch it again.
});


ReactDOM.render(
    // The ApolloProvider component uses React's Context API to make a configured Apollo Client
    // instance available throughout a React component tree. Now all of our pages, containers,
    // and components can access the client via friendly React Hooks thanks to the context API.
    <ApolloProvider client={client}>
        <GlobalStyles />
        <Pages />
    </ApolloProvider>,
    document.getElementById("root")
);
