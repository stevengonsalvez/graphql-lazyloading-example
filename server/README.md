# GraphQL Server with Lazy Loading

This server demonstrates GraphQL lazy loading capabilities using `@defer` and `@stream` directives, which allow for progressive loading of data.

## Key Features

### 1. @defer Directive

The `@defer` directive allows the server to return non-critical fields later, after sending the initial response. This is useful for fields that:

- Are expensive to compute
- Are not immediately visible to the user
- Contain supplementary information

**Example in schema:**

```graphql
type User {
  id: ID!
  name: String!
  # Basic fields returned immediately
  
  # Detailed fields deferred
  recommendations: [Recommendation!] @defer
}
```

### 2. @stream Directive

The `@stream` directive allows the server to send list items one by one as they become available, instead of waiting for the entire list. This is useful for:

- Long lists where early items can be shown immediately
- Items that come from different data sources with varying response times
- Creating a more responsive UI

**Example in schema:**

```graphql
type Query {
  promotions: [Promotion!]! @stream
}
```

## Implementation Details

This server uses:

1. **GraphQL Yoga** - A modern GraphQL server that supports incremental delivery
2. **Mock Data** - Simulated data resembling an EE-like telecom website
3. **Artificial Delays** - To demonstrate the progressive loading

## Schema Organization

The schema is organized into domains matching the EE website sections:

- User account & billing
- Promotions & offers
- Product categories
- Device information
- Discover items

## Running the Server

```bash
npm install
npm start
```

The server will be available at http://localhost:4000/graphql where you can explore the schema and test queries with GraphiQL.

## Testing Lazy Loading

You can test the lazy loading capabilities directly in GraphiQL by running queries with `@defer` and `@stream` directives. The network tab will show multiple response chunks coming from the server over time.
