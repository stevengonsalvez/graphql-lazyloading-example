import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_BILL_QUERY, USER_BILL_QUERY_EAGER } from '../graphql/queries';
import UserInfo from './UserInfo';
import CurrentBill from './CurrentBill';
import BillHistory from './BillHistory';

// Component for displaying network timeline
const NetworkTimeline: React.FC<{
  timeline: {time: number, event: string}[],
  title: string
}> = ({ timeline, title }) => (
  <div className="mb-4 p-3 bg-gray-800 rounded-lg text-white text-xs max-h-40 overflow-auto">
    <h3 className="font-bold mb-2">{title}</h3>
    <div className="space-y-1">
      {timeline.map((item, index) => (
        <div key={index} className="flex">
          <span className="inline-block w-16 text-yellow-400">{item.time}ms:</span>
          <span>{item.event}</span>
        </div>
      ))}
      {timeline.length === 0 && (
        <div className="text-gray-400 italic">Waiting for events...</div>
      )}
    </div>
  </div>
);

const ComparisonDemo: React.FC = () => {
  // State for lazy loading with @defer
  const [deferTimeline, setDeferTimeline] = useState<{time: number, event: string}[]>([]);
  const [deferErrorDetails, setDeferErrorDetails] = useState<string | null>(null);
  
  // State for eager loading (no @defer)
  const [eagerTimeline, setEagerTimeline] = useState<{time: number, event: string}[]>([]);
  const [eagerErrorDetails, setEagerErrorDetails] = useState<string | null>(null);
  
  // Timestamps to track when each query started
  const deferStartTime = React.useRef(Date.now());
  const eagerStartTime = React.useRef(Date.now());
  
  // Show/hide debug panel
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  
  // Execute the lazy loading query
  const { 
    data: deferData, 
    loading: deferLoading, 
    error: deferError, 
    networkStatus: deferNetworkStatus 
  } = useQuery(USER_BILL_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onError: (error) => {
      setDeferErrorDetails(JSON.stringify(error, null, 2));
    }
  });
  
  // Execute the eager loading query
  const { 
    data: eagerData, 
    loading: eagerLoading, 
    error: eagerError, 
    networkStatus: eagerNetworkStatus 
  } = useQuery(USER_BILL_QUERY_EAGER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onError: (error) => {
      setEagerErrorDetails(JSON.stringify(error, null, 2));
    }
  });
  
  // Helper function to get status text
  const getStatusText = (status: number): string => {
    switch (status) {
      case 1: return 'loading';
      case 2: return 'setVariables';
      case 3: return 'fetchMore';
      case 4: return 'refetch';
      case 6: return 'poll';
      case 7: return 'ready';
      case 8: return 'error';
      default: return `unknown (${status})`;
    }
  };
  
  // Track status changes for lazy loading
  useEffect(() => {
    const timeElapsed = Date.now() - deferStartTime.current;
    setDeferTimeline(prev => [
      ...prev, 
      {time: timeElapsed, event: `NetworkStatus: ${getStatusText(deferNetworkStatus)}`}
    ]);
  }, [deferNetworkStatus]);
  
  // Track status changes for eager loading
  useEffect(() => {
    const timeElapsed = Date.now() - eagerStartTime.current;
    setEagerTimeline(prev => [
      ...prev, 
      {time: timeElapsed, event: `NetworkStatus: ${getStatusText(eagerNetworkStatus)}`}
    ]);
  }, [eagerNetworkStatus]);
  
  // Log data changes for lazy loading
  useEffect(() => {
    if (deferData) {
      const timeElapsed = Date.now() - deferStartTime.current;
      setDeferTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: 'Data update received'}
      ]);
    }
  }, [deferData]);
  
  // Log data changes for eager loading
  useEffect(() => {
    if (eagerData) {
      const timeElapsed = Date.now() - eagerStartTime.current;
      setEagerTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: 'Data update received'}
      ]);
    }
  }, [eagerData]);
  
  // Log errors for lazy loading
  useEffect(() => {
    if (deferError) {
      const timeElapsed = Date.now() - deferStartTime.current;
      setDeferTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: `Error: ${deferError.message}`}
      ]);
      setDeferErrorDetails(JSON.stringify(deferError, null, 2));
    }
  }, [deferError]);
  
  // Log errors for eager loading
  useEffect(() => {
    if (eagerError) {
      const timeElapsed = Date.now() - eagerStartTime.current;
      setEagerTimeline(prev => [
        ...prev, 
        {time: timeElapsed, event: `Error: ${eagerError.message}`}
      ]);
      setEagerErrorDetails(JSON.stringify(eagerError, null, 2));
    }
  }, [eagerError]);
  
  // Extract data for lazy loading components
  const deferUser = deferData?.currentUser;
  const deferBillInfo = deferUser?.billInformation;
  const deferHistoryItems = deferBillInfo?.historyDetails;
  
  // Extract data for eager loading components
  const eagerUser = eagerData?.currentUser;
  const eagerBillInfo = eagerUser?.billInformation;
  const eagerHistoryItems = eagerBillInfo?.historyDetails;
  
  // Check loading states for lazy loading
  const isDeferUserLoading = deferLoading && !deferUser;
  const isDeferBillLoading = !deferBillInfo && !!deferUser;
  const isDeferHistoryLoading = !deferHistoryItems && !!deferBillInfo;
  
  // Check loading states for eager loading (all or nothing)
  const isEagerLoading = eagerLoading;
  
  // Reset the timeline when reloading
  const handleReload = () => {
    deferStartTime.current = Date.now();
    eagerStartTime.current = Date.now();
    setDeferTimeline([]);
    setEagerTimeline([]);
    setDeferErrorDetails(null);
    setEagerErrorDetails(null);
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">GraphQL Loading Comparison</h1>
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
      
      {/* Debug Panel */}
      {showDebugPanel && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <NetworkTimeline 
            timeline={deferTimeline} 
            title="Lazy Loading (@defer) Timeline" 
          />
          <NetworkTimeline 
            timeline={eagerTimeline} 
            title="Eager Loading Timeline" 
          />
          
          {/* Raw data sections */}
          {deferData && (
            <div className="p-3 bg-gray-800 rounded-lg text-white text-xs max-h-40 overflow-auto">
              <h3 className="font-bold mb-2">Lazy Loading Data:</h3>
              <details>
                <summary className="cursor-pointer">View Raw Data</summary>
                <pre className="mt-2 overflow-auto max-h-36 bg-gray-900 p-2 rounded">
                  {JSON.stringify(deferData, null, 2)}
                </pre>
              </details>
            </div>
          )}
          
          {eagerData && (
            <div className="p-3 bg-gray-800 rounded-lg text-white text-xs max-h-40 overflow-auto">
              <h3 className="font-bold mb-2">Eager Loading Data:</h3>
              <details>
                <summary className="cursor-pointer">View Raw Data</summary>
                <pre className="mt-2 overflow-auto max-h-36 bg-gray-900 p-2 rounded">
                  {JSON.stringify(eagerData, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}
      
      {/* Main content grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column - Lazy Loading with @defer */}
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-3">Progressive Loading from graphql</h2>
            <p className="text-sm text-gray-600 mb-4">
              Data loads progressively with the most important information first
            </p>
            
            <div className="mb-3 p-3 bg-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Component Loading Status</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className={`p-2 rounded-lg ${isDeferUserLoading ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  User: {isDeferUserLoading ? 'Loading...' : 'Ready'}
                </div>
                <div className={`p-2 rounded-lg ${isDeferBillLoading ? 'bg-yellow-100' : deferBillInfo ? 'bg-green-100' : 'bg-gray-200'}`}>
                  Bill: {isDeferBillLoading ? 'Loading...' : deferBillInfo ? 'Ready' : 'Waiting...'}
                </div>
                <div className={`p-2 rounded-lg ${isDeferHistoryLoading ? 'bg-yellow-100' : deferHistoryItems ? 'bg-green-100' : 'bg-gray-200'}`}>
                  History: {isDeferHistoryLoading ? 'Loading...' : deferHistoryItems ? 'Ready' : 'Waiting...'}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Network Status: {deferNetworkStatus} | 
                Time: {Date.now() - deferStartTime.current}ms
              </div>
            </div>
          
            <div className="space-y-4">
              <UserInfo 
                loading={isDeferUserLoading} 
                user={deferUser} 
              />
              
              <CurrentBill 
                loading={isDeferBillLoading} 
                billInfo={deferBillInfo} 
              />
              
              <BillHistory 
                loading={isDeferHistoryLoading} 
                historyItems={deferHistoryItems} 
              />
            </div>
          </div>
        </div>
        
        {/* Right column - Eager Loading (no @defer) */}
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-3">Eager Loading (without @defer)</h2>
            <p className="text-sm text-gray-600 mb-4">
              All data loads at once, only shows UI when everything is ready
            </p>
            
            <div className="mb-3 p-3 bg-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Component Loading Status</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className={`p-2 rounded-lg ${isEagerLoading ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  User: {isEagerLoading ? 'Loading...' : 'Ready'}
                </div>
                <div className={`p-2 rounded-lg ${isEagerLoading ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  Bill: {isEagerLoading ? 'Loading...' : 'Ready'}
                </div>
                <div className={`p-2 rounded-lg ${isEagerLoading ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  History: {isEagerLoading ? 'Loading...' : 'Ready'}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Network Status: {eagerNetworkStatus} | 
                Time: {Date.now() - eagerStartTime.current}ms
              </div>
            </div>
            
            <div className="space-y-4">
              <UserInfo 
                loading={isEagerLoading} 
                user={eagerUser} 
              />
              
              <CurrentBill 
                loading={isEagerLoading} 
                billInfo={eagerBillInfo} 
              />
              
              <BillHistory 
                loading={isEagerLoading} 
                historyItems={eagerHistoryItems} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-100 p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">How This Comparison Works</h3>
        <p className="mb-2">
          This page demonstrates the difference between GraphQL's incremental delivery (@defer) and traditional loading:
        </p>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold mb-1">Left Side: Lazy Loading with @defer</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>User information loads first (part of initial query response)</li>
              <li>Bill information loads second (deferred loading)</li>
              <li>Bill history loads last (nested deferred loading)</li>
            </ol>
            <p className="mt-2 text-gray-600 text-xs">
              Progressive loading improves perceived performance by showing important data first.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Right Side: Eager Loading</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>The entire query is executed at once</li>
              <li>All data is returned in a single response</li>
              <li>UI only updates after all data has been received</li>
            </ol>
            <p className="mt-2 text-gray-600 text-xs">
              Traditional loading is simpler but can delay showing any content until all data is ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDemo; 