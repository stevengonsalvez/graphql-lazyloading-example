import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import MobileAppComparison from './components/MobileAppComparison';
import NetworkMonitor from './components/NetworkMonitor';

// Import all components
import Header from './components/Header';
import UserGreeting from './components/UserGreeting';
import TopTasks from './components/TopTasks';
import AccountUpdates from './components/AccountUpdates';
import Promotions from './components/Promotions';
import Categories from './components/Categories';
import DiscoverItems from './components/DiscoverItems';
import Devices from './components/Devices';
import Footer from './components/Footer';

// Debug component to visualize deferred/streamed loading
const LazyLoadDebugger: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-50 text-xs border border-ee-teal">
      <h3 className="font-bold text-ee-teal mb-1">GraphQL Lazy Loading Demo</h3>
      <p className="mb-2">This demo shows how GraphQL can progressively load data using:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li><code className="bg-gray-100 px-1">@defer</code> - For non-critical fields</li>
        <li><code className="bg-gray-100 px-1">@stream</code> - For list items</li>
      </ul>
      <p className="mt-2 text-gray-500">Look for the loading spinners throughout the page!</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100">
        <MobileAppComparison />
        <NetworkMonitor />
      </div>
    </ApolloProvider>
  );
};

export default App;
