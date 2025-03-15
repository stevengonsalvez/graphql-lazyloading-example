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
# Copy the schema file directly to ensure it's available
COPY --from=server-builder /app/server/src/schema ./dist/schema

# Copy client build
COPY --from=client-builder /app/client/build ./public

# Copy the server.js file
COPY server.js /app/server.js

# Install additional dependencies
RUN npm install express cors @graphql-tools/schema

# Set the command to run the server
CMD ["node", "server.js"]

# Expose the port
EXPOSE 4000
