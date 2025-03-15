import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import fs from 'node:fs';
import path from 'node:path';
import { resolvers } from './resolvers/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Read the schema file
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema', 'schema.graphql'),
  'utf-8'
);

// Create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create the GraphQL server
const yoga = createYoga({
  schema,
  graphiql: true,  // Enable the GraphiQL interface for testing
  context: () => ({}),
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
