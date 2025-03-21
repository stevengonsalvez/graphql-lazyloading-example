import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import EagerDemo from '../components/EagerDemo';
import { USER_BILL_QUERY_EAGER } from '../graphql/queries';

// Mock data for the test
const mocks = [
  {
    request: {
      query: USER_BILL_QUERY_EAGER,
    },
    result: {
      data: {
        currentUser: {
          id: '1',
          name: 'Test User',
          phoneNumber: '555-123-4567',
          billInformation: {
            amount: 75.99,
            dueDate: '2023-04-15',
            isPaid: false,
            unlimitedData: true,
            historyDetails: [
              {
                date: '2023-03-15',
                amount: 75.99,
                status: 'Paid'
              },
              {
                date: '2023-02-15',
                amount: 75.99,
                status: 'Paid'
              }
            ]
          }
        }
      }
    }
  }
];

describe('EagerDemo Component', () => {
  it('renders without errors', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EagerDemo />
      </MockedProvider>
    );
    
    // Initially should be in loading state
    expect(screen.getByText(/GraphQL Eager Loading Demo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Loading/i).length).toBeGreaterThan(0);
    
    // After data loads, we should see the user name
    await waitFor(() => {
      expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    });
    
    // All data should load at once in eager mode
    await waitFor(() => {
      expect(screen.getByText(/75.99/i)).toBeInTheDocument();
      expect(screen.getByText(/standard GraphQL loading/i)).toBeInTheDocument();
    });
  });
  
  it('highlights the difference between eager and deferred loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EagerDemo />
      </MockedProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/entire query is executed at once/i)).toBeInTheDocument();
      expect(screen.getByText(/All data is loaded and returned in a single response/i)).toBeInTheDocument();
    });
  });
}); 