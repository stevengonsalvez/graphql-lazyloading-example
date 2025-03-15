# React Client for GraphQL Lazy Loading Demo

This React application demonstrates how to effectively use GraphQL's incremental delivery capabilities (`@defer` and `@stream` directives) to create a progressively loading UI.

## Features

### 1. Visual Indicators for Lazy Loading

The application includes various visual cues to indicate when data is being loaded:

- Skeleton placeholders for initial loading states
- Spinning indicators for deferred content
- Progressive appearance of streamed list items
- Expandable sections that load details on demand

### 2. Apollo Client Integration

The client uses Apollo Client configured to work with `@defer` and `@stream` directives:

```javascript
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  // This is important to enable @defer and @stream
  assumeImmutableResults: false,
});
```

### 3. Component Structure

The application is structured to match the EE website layout with components for:

- User greeting and account info
- Bill and usage information
- Promotional offers
- Product categories
- Discover items
- Device management

Each component handles its own loading states and shows appropriate UI feedback during incremental loading.

## UI Implementation

The UI demonstrates several progressive loading patterns:

1. **Basic to Detailed** - Show essential information first, then load details
2. **Above the Fold Priority** - Load visible content first, defer below-the-fold
3. **List Streaming** - Show list items as they arrive instead of waiting for all
4. **On-Demand Details** - Load additional information only when requested by user
5. **Visual Feedback** - Show loading indicators appropriate to the context

## Running the Client

```bash
npm install
npm start
```

The application will be available at http://localhost:3000 and will connect to the GraphQL server running at http://localhost:4000.

## Key GraphQL Queries

All queries are defined in `src/graphql/queries.ts` and showcase various combinations of `@defer` and `@stream` directives.

### Main Home Page Query

The main query combines both directives for optimal loading:

```graphql
query HomePageQuery {
  currentUser {
    # Immediate fields
    id
    name
    
    # Deferred fields
    ... on User @defer {
      recommendations {
        # Recommendations data
      }
    }
    
    # Streamed collections
    accountUpdates @stream {
      # Updates as they arrive
    }
  }
  
  # More queries with @defer and @stream
}
```

## Performance Notes

- Initial page load is faster since it doesn't wait for all data
- UI is more responsive as content streams in progressively
- User can interact with parts of the page while others are still loading
- Critical content appears quickly while supplementary content loads in the background
