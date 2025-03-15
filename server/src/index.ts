import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';
import fs from 'node:fs';
import path from 'node:path';
import { resolvers } from './resolvers/resolvers';

// Read the schema file
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema', 'schema.graphql'),
  'utf-8'
);

// Create a schema using graphql-yoga's createSchema
// This has built-in support for @defer and @stream directives
const schema = createSchema({
  typeDefs,
  resolvers
});

// Create the GraphQL server
const yoga = createYoga({
  schema,
  graphiql: true,  // Enable the GraphiQL interface for testing
  context: () => ({}),
  // Explicitly enable @defer and @stream support
  maskedErrors: false,
  batching: true,
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
  logging: {
    debug: (...args) => console.log(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
  },
});

// Create a server
const server = createServer(yoga);

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 GraphQL Server running at http://localhost:${PORT}/graphql`);
  console.log(`📊 GraphiQL interface available at http://localhost:${PORT}/graphql`);
  console.log('✨ Server supports @defer and @stream directives for lazy loading!');
});
