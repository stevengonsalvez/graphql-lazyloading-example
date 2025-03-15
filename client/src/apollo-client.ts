import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

// Create a debug link for logging requests and responses
const debugLink = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation;
  
  console.log(`GraphQL Request: ${operationName}`, {
    query: operation.query?.loc?.source?.body,
    variables,
  });
  
  return forward(operation).map((response) => {
    // Safe access to hasNext property (might exist at runtime but not in TypeScript types)
    const hasNext = 'hasNext' in response ? response.hasNext : undefined;
    
    console.log(`GraphQL Response: ${operationName}`, {
      data: response.data,
      errors: response.errors,
      hasNext,
      isDeferred: hasNext === true,
    });
    return response;
  });
});

// Create the HTTP link with multipart configuration for @defer
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
  includeExtensions: true,
  headers: {
    'Accept': 'multipart/mixed; deferSpec=20220824, application/json'
  }
});

// Combine the links
const link = ApolloLink.from([debugLink, httpLink]);

// Configure the Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          billInformation: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          }
        }
      },
      BillInformation: {
        fields: {
          historyDetails: {
            merge(existing = [], incoming) {
              return incoming;
            },
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    },
  },
  assumeImmutableResults: false,
});

export default client;
