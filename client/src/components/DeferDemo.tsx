import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_BILL_QUERY } from '../graphql/queries';
import UserInfo from './UserInfo';
import CurrentBill from './CurrentBill';
import BillHistory from './BillHistory';

const DeferDemo: React.FC = () => {
  const [networkStatusHistory, setNetworkStatusHistory] = useState<number[]>([]);
  const [responseTimeline, setResponseTimeline] = useState<{time: number, event: string}[]>([]);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  
  const startTime = React.useRef(Date.now());
  
  // Execute the query with incremental loading
  const { data, loading, error, networkStatus } = useQuery(USER_BILL_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    // Add error policy to continue even if there are errors
    errorPolicy: 'all',
    onError: (error) => {
      // Capture detailed error information
      setErrorDetails(JSON.stringify(error, null, 2));
    }
  });

  // Track network status changes
  useEffect(() => {
    setNetworkStatusHistory(prev => [...prev, networkStatus]);
    
    const timeElapsed = Date.now() - startTime.current;
    let statusText = '';
    
    switch (networkStatus) {
      case 1: statusText = 'loading'; break;
      case 2: statusText = 'setVariables'; break;
      case 3: statusText = 'fetchMore'; break;
      case 4: statusText = 'refetch'; break;
      case 6: statusText = 'poll'; break;
      case 7: statusText = 'ready'; break;
      case 8: statusText = 'error'; break;
      default: statusText = `unknown (${networkStatus})`;
    }
    
    setResponseTimeline(prev => [
      ...prev, 
      {time: timeElapsed, event: `NetworkStatus: ${statusText}`}
    ]);
  }, [networkStatus]);

  // Log data changes
  useEffect(() => {
    if (data) {
      const timeElapsed = Date.now() - startTime.current;
      
      // Log when data arrives
      setResponseTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: 'Data update received'}
      ]);
      
      console.log('Data received:', {
        timeElapsed,
        data,
        hasUser: !!data.currentUser,
        hasBill: !!data.currentUser?.billInformation,
        hasHistory: !!data.currentUser?.billInformation?.historyDetails,
      });
    }
  }, [data]);

  // Log errors
  useEffect(() => {
    if (error) {
      const timeElapsed = Date.now() - startTime.current;
      
      setResponseTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: `Error: ${error.message}`}
      ]);
      
      console.error('Query error:', {
        timeElapsed,
        error,
      });
      
      // Capture detailed error information
      setErrorDetails(JSON.stringify(error, null, 2));
    }
  }, [error]);

  // Reset the timeline when reloading
  const handleReload = () => {
    startTime.current = Date.now();
    setNetworkStatusHistory([]);
    setResponseTimeline([]);
    setErrorDetails(null);
    window.location.reload();
  };

  // Extract data for components - safely access with optional chaining
  const currentUser = data?.currentUser;
  const billInfo = currentUser?.billInformation;
  const historyItems = billInfo?.historyDetails;
  
  // Check loading states
  const isUserLoading = loading && !currentUser;
  const isBillLoading = !billInfo && !!currentUser;
  const isHistoryLoading = !historyItems && !!billInfo;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">GraphQL @defer Demo</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDebugPanel(!showDebugPanel)}
            className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
          >
            {showDebugPanel ? 'Hide Debug' : 'Show Debug'}
          </button>
          <button
            onClick={handleReload}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
          {errorDetails && (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm">View Error Details</summary>
              <pre className="mt-2 text-xs overflow-auto max-h-40 bg-red-50 p-2 rounded">
                {errorDetails}
              </pre>
            </details>
          )}
        </div>
      )}
      
      {showDebugPanel && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg text-white text-xs overflow-auto max-h-64">
          <h3 className="font-bold mb-2">Response Timeline:</h3>
          <div className="space-y-1">
            {responseTimeline.map((item, index) => (
              <div key={index} className="flex">
                <span className="inline-block w-16 text-yellow-400">{item.time}ms:</span>
                <span>{item.event}</span>
              </div>
            ))}
            {responseTimeline.length === 0 && (
              <div className="text-gray-400 italic">Waiting for events...</div>
            )}
          </div>
          
          {/* Raw data section */}
          {data && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="font-bold mb-2">Current Data:</h3>
              <details>
                <summary className="cursor-pointer">View Raw Data</summary>
                <pre className="mt-2 overflow-auto max-h-40 bg-gray-900 p-2 rounded">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Query Status</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className={`p-2 rounded-lg ${isUserLoading ? 'bg-yellow-100' : 'bg-green-100'}`}>
            User Info: {isUserLoading ? 'Loading...' : 'Ready'}
          </div>
          <div className={`p-2 rounded-lg ${isBillLoading ? 'bg-yellow-100' : billInfo ? 'bg-green-100' : 'bg-gray-200'}`}>
            Bill Info: {isBillLoading ? 'Loading...' : billInfo ? 'Ready' : 'Waiting...'}
          </div>
          <div className={`p-2 rounded-lg ${isHistoryLoading ? 'bg-yellow-100' : historyItems ? 'bg-green-100' : 'bg-gray-200'}`}>
            History: {isHistoryLoading ? 'Loading...' : historyItems ? 'Ready' : 'Waiting...'}
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-600">
          Network Status: <span className="font-mono">{networkStatus}</span> |
          Time Elapsed: <span className="font-mono">{Date.now() - startTime.current}ms</span>
        </div>
      </div>
      
      <div className="grid gap-4">
        <UserInfo 
          loading={isUserLoading} 
          user={currentUser} 
        />
        
        <CurrentBill 
          loading={isBillLoading} 
          billInfo={billInfo} 
        />
        
        <BillHistory 
          loading={isHistoryLoading} 
          historyItems={historyItems} 
        />
      </div>
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">How This Works</h3>
        <p className="mb-2">
          This demo shows GraphQL's <code className="bg-gray-200 px-1">@defer</code> directive in action:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>The user information loads first (part of the main query response)</li>
          <li>The bill information loads second (deferred with <code className="bg-gray-200 px-1">@defer</code>)</li>
          <li>The bill history loads last (nested <code className="bg-gray-200 px-1">@defer</code> inside bill information)</li>
        </ol>
        <p className="mt-2 text-gray-600">
          This progressive loading improves perceived performance by showing the most important data first.
        </p>
      </div>
    </div>
  );
};

export default DeferDemo; 