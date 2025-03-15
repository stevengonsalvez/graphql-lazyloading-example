# GraphQL Lazy Loading POC

This project demonstrates GraphQL lazy loading techniques using @defer and @stream directives.

## Project Structure

- `/server` - GraphQL server with mock data and lazy loading capabilities
- `/client` - React single page application that consumes the GraphQL API

## Key Features

- Mock data simulating an EE-like telecom website
- GraphQL server with @defer and @stream directive support
- React client that progressively loads data
- Visual indicators for showing lazy-loaded content

## Getting Started

### Server

```bash
cd server
npm install
npm start
```

### Client

```bash
cd client
npm install
npm start
```

## Technologies Used

- GraphQL Yoga & Apollo Server
- TypeScript
- React
- Apollo Client
- Tailwind CSS
