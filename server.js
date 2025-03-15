const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { createSchema, createYoga } = require('graphql-yoga');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const fs = require('fs');
const cors = require('cors');

// Import the resolvers from the build
const { resolvers } = require('./dist/resolvers/resolvers');

// Read the schema file - using path relative to the current directory
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'dist/schema/schema.graphql'),
  'utf-8'
);

// Debug: Log the path and check if file exists
console.log('Looking for schema at:', path.join(__dirname, 'dist/schema/schema.graphql'));
console.log('Directory exists:', fs.existsSync(path.join(__dirname, 'dist/schema')));
console.log('Files in directory:', fs.existsSync(path.join(__dirname, 'dist/schema')) ? 
  fs.readdirSync(path.join(__dirname, 'dist/schema')) : 'Directory not found');

const app = express();
app.use(cors());

// Create an executable schema using graphql-tools
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Create the yoga instance
const yoga = createYoga({
  schema: executableSchema,
  graphiql: true,
  context: () => ({}),
  logging: {
    debug: (...args) => console.log(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
  },
});

// Mount yoga at /graphql
app.use('/graphql', yoga);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// For any request that doesn't match above, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 4000;
const server = createServer(app);

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 GraphiQL interface available at http://localhost:${port}/graphql`);
  console.log('✨ Server supports @defer and @stream directives for lazy loading!');
}); 