# Multi-stage build for GraphQL Lazy Loading POC

# Stage 1: Build the server
FROM node:18-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server .
RUN npm run build

# Stage 2: Build the client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# Stage 3: Production server with client assets
FROM node:18-alpine
WORKDIR /app

# Copy server build
COPY --from=server-builder /app/server/dist ./dist
COPY --from=server-builder /app/server/package*.json ./
COPY --from=server-builder /app/server/node_modules ./node_modules

# Copy client build
COPY --from=client-builder /app/client/build ./public

# Create a simple express server to serve both the GraphQL API and the React app
RUN npm install express cors

# Create server.js to serve both the GraphQL API and the React app
COPY <<EOF /app/server.js
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { createYoga } = require('graphql-yoga');
const fs = require('fs');
const cors = require('cors');

// Import the resolvers from the build
const { resolvers } = require('./dist/resolvers/resolvers');

// Read the schema file
const typeDefs = fs.readFileSync(
  path.join(__dirname, 'dist', 'schema', 'schema.graphql'),
  'utf-8'
);

const app = express();
app.use(cors());

// Create the yoga instance
const yoga = createYoga({
  schema: {
    typeDefs,
    resolvers,
  },
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
EOF

# Set the command to run the server
CMD ["node", "server.js"]

# Expose the port
EXPOSE 4000
