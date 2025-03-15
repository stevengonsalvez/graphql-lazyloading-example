import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create the HTTP link to connect to our GraphQL server
const httpLink = new HttpLink({
  uri: '/graphql',  // This will use the proxy setting in package.json
  includeExtensions: true, // Required for @defer/@stream
});

// Configure the client to handle @defer and @stream directives
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    // Required for proper handling of incremental data
    possibleTypes: {},
    typePolicies: {}
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  // Required to enable incremental delivery support (@defer and @stream)
  name: 'ee-lazy-loading-demo',
  version: '1.0',
  assumeImmutableResults: false,
});

export default client;
