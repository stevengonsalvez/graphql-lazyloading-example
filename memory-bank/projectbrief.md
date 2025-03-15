# Project Brief: GraphQL Lazy Loading POC

## Project Goal
Create a proof-of-concept application demonstrating GraphQL's lazy loading capabilities using `@defer` and `@stream` directives. The application will simulate the EE website (based on provided screenshot) and showcase how progressive data loading improves user experience.

## Core Requirements

1. **GraphQL Server with Lazy Loading**
   - Implement a GraphQL server that supports `@defer` and `@stream` directives
   - Create a realistic schema modeling an EE-like telecom website
   - Simulate network delays to demonstrate progressive loading

2. **Mock Data Structure**
   - Generate realistic mock data representing user account, billing, products, and promotions
   - Organize data into domains reflecting EE website sections

3. **React Client Application**
   - Build a React application that visually resembles the EE website
   - Implement UI components that work with incrementally loaded data
   - Display appropriate loading states as data arrives

4. **Lazy Loading Demonstration**
   - Showcase different lazy loading patterns and techniques
   - Provide visual indicators to highlight where lazy loading is occurring
   - Ensure the application is responsive during data loading

## Success Criteria

1. The GraphQL server correctly implements `@defer` and `@stream` directives
2. The React client progressively renders data as it arrives from the server
3. The application resembles the EE website shown in the screenshot
4. Users can observe the benefits of lazy loading through UI indicators and responsiveness
5. The codebase is well-structured with clear documentation explaining the implemented patterns

## Technical Constraints

- Use TypeScript for both server and client codebases
- Use GraphQL Yoga or Apollo Server for the server implementation
- Use Apollo Client for the React client
- Implement with React and Tailwind CSS for the frontend
