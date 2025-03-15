import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

// Create the HTTP link to connect to our GraphQL server
const httpLink = new HttpLink({
  uri: '/graphql',  // This will use the proxy setting in package.json
});

// Configure the client to handle @defer and @stream directives
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  // Enable experimental features including @defer and @stream
  name: 'ee-lazy-loading-demo',
  version: '1.0',
  // This is important to enable @defer and @stream
  assumeImmutableResults: false,
});

export default client;
