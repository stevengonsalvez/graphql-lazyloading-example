# Tech Context: GraphQL Lazy Loading POC

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **TypeScript** - Typed superset of JavaScript
- **GraphQL Yoga** - Modern GraphQL server with defer/stream support
- **GraphQL** - API query language and runtime

### Frontend
- **React** - UI component library
- **TypeScript** - For type safety
- **Apollo Client** - GraphQL client with defer/stream support
- **Tailwind CSS** - Utility-first CSS framework for styling

### Development Tools
- **npm** - Package manager
- **ts-node** - TypeScript execution environment
- **Docker** / **Docker Compose** - Containerization for development and deployment

## Development Setup

### Local Development
The project is structured for local development with:

```
/gql-poc/
├── /server/          # GraphQL server
│   ├── /src/         # Source code
│   │   ├── /schema/  # GraphQL schema
│   │   ├── /resolvers/ # Resolvers with lazy loading
│   │   └── /mocks/   # Mock data
│   ├── package.json  # Server dependencies
│   └── tsconfig.json # TypeScript configuration
├── /client/          # React application
│   ├── /src/         # Source code
│   │   ├── /components/ # React components
│   │   └── /graphql/ # GraphQL queries
│   ├── package.json  # Client dependencies
│   └── tsconfig.json # TypeScript configuration
├── /memory-bank/     # Project documentation
└── docker-compose.yml # Development environment
```

### Server Setup
```bash
cd server
npm install
npm start
```

### Client Setup
```bash
cd client
npm install
npm start
```

### Docker Setup
```bash
docker-compose up
```

## Technical Constraints

### GraphQL Directives Support
- The `@defer` and `@stream` directives require specific server support
- Only certain GraphQL servers (like Yoga and newer Apollo Server) support these directives
- Client applications need to be configured to handle incremental responses

### Browser Compatibility
- Incremental delivery in GraphQL requires browsers that support:
  - Streaming fetch responses
  - ReadableStream API
  - Modern JavaScript features

### Apollo Client Configuration
- Apollo Client must be configured with `assumeImmutableResults: false` for defer/stream
- Documentation for these features is limited as they're relatively new

### TypeScript Type Safety
- Many directive-related features require custom type definitions
- Generated types may not fully capture the streaming/deferred nature of the data

## Dependencies

### Server Dependencies
- **graphql-yoga**: ^5.1.1 - GraphQL server with defer/stream support
- **graphql**: ^16.8.1 - GraphQL JavaScript implementation
- **typescript**: ^5.3.2 - TypeScript language
- **ts-node**: ^10.9.1 - TypeScript execution environment
- **ts-node-dev**: ^2.0.0 - Development environment with auto-restart
- **faker**: ^5.5.3 - Mock data generation

### Client Dependencies
- **react**: ^18.2.0 - UI library
- **react-dom**: ^18.2.0 - React DOM bindings
- **@apollo/client**: ^3.8.8 - GraphQL client with defer/stream support
- **graphql**: ^16.8.1 - GraphQL JavaScript implementation
- **typescript**: ^4.9.5 - TypeScript language
- **tailwindcss**: ^3.3.0 - Utility CSS framework
- **react-scripts**: 5.0.1 - Create React App scripts and configurations

### Development Dependencies
- **docker**: For containerization
- **docker-compose**: For multi-container Docker applications
- **autoprefixer**: ^10.4.16 - PostCSS plugin to parse CSS and add vendor prefixes
- **postcss**: ^8.4.31 - Tool for transforming CSS with JavaScript plugins
