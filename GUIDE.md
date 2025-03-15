# GraphQL Lazy Loading POC Guide

This project demonstrates how to implement lazy loading in GraphQL using `@defer` and `@stream` directives. It consists of a mock GraphQL server and a React client application resembling an EE telecom website.

## Project Structure

```
/gql-poc
├── /server           # GraphQL server with lazy loading support
│   ├── /src
│   │   ├── /schema   # GraphQL schema with @defer and @stream directives
│   │   ├── /resolvers # Resolvers with delayed responses for demonstration
│   │   └── /mocks    # Mock data simulating the EE website content
│   └── README.md     # Server-specific documentation
├── /client           # React application
│   ├── /src
│   │   ├── /components  # UI components with loading indicators
│   │   └── /graphql    # GraphQL queries using @defer and @stream
│   └── README.md     # Client-specific documentation
├── docker-compose.yml # For development setup
└── Dockerfile        # For production deployment
```

## Getting Started

### Development Setup

1. **Start the GraphQL Server**:

```bash
cd server
npm install
npm start
```

The GraphQL server will run at http://localhost:4000/graphql

2. **Start the React Client**:

```bash
cd client
npm install
npm start
```

The React application will run at http://localhost:3000

### Using Docker Compose (Alternative)

If you prefer to use Docker for development:

```bash
docker-compose up
```

This will start both the server and client in development mode with hot reloading.

## GraphQL Lazy Loading Features

### 1. @defer Directive

The `@defer` directive allows the server to return non-critical fields later. Examples in this project:

- User recommendations in the home page
- Detailed information in promotional cards
- Technical details for user devices

**Example Query:**

```graphql
query {
  promotions {
    id
    title
    description
    # These details will be deferred
    ... on Promotion @defer {
      details {
        termsAndConditions
        validUntil
      }
    }
  }
}
```

### 2. @stream Directive

The `@stream` directive allows the server to send list items one by one. Examples in this project:

- Product categories
- Promotional offers
- Account updates
- Top tasks

**Example Query:**

```graphql
query {
  # Items will stream in one by one
  topTasks @stream {
    id
    title
    description
  }
}
```

## UI Implementation

The React client demonstrates how to handle incrementally delivered data:

1. **Loading States**: Skeleton loading states for initial content
2. **Progressive UI**: New items appear as they stream in
3. **Deferred Content**: Expandable sections that load details when requested
4. **Loading Indicators**: Visual feedback showing which content is still loading

## Testing Lazy Loading

To best see the lazy loading in action:

1. Open the React app at http://localhost:3000
2. Open your browser's Developer Tools
3. Go to the Network tab and filter for "graphql"
4. Observe how the response comes in multiple chunks
5. Note the visual loading indicators throughout the UI

## Production Deployment

Build and run the Docker container:

```bash
docker build -t gql-lazy-loading .
docker run -p 4000:4000 gql-lazy-loading
```

This will build both server and client, and serve the application at http://localhost:4000.

## Key Technical Insights

1. **Server Configuration**: GraphQL Yoga is configured to support incremental delivery

2. **Client Configuration**: Apollo Client is configured with:
   ```javascript
   assumeImmutableResults: false
   ```

3. **Resolver Pattern**: Generator functions are used for streaming
   ```typescript
   categories: async function* () {
     for (const category of categoriesMock) {
       await delay(300); // Simulate delay between items
       yield category;
     }
   }
   ```

4. **React Patterns**: Components handle both:
   - Partially loaded data (items appearing one by one)
   - Placeholder states for deferred content
