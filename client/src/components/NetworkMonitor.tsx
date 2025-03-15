import React, { useState, useEffect } from 'react';

type NetworkEvent = {
  id: string;
  type: 'request' | 'response';
  operationName: string;
  timestamp: string;
  data?: any;
  hasNext?: boolean;
};

const NetworkMonitor: React.FC = () => {
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [expanded, setExpanded] = useState(true);

  // Listen for console.log events to capture network activity
  useEffect(() => {
    const originalConsoleLog = console.log;
    
    // Override console.log to capture Apollo network events
    console.log = function(...args) {
      originalConsoleLog.apply(console, args);
      
      // Check if this is a GraphQL request or response
      if (typeof args[0] === 'string') {
        if (args[0].includes('GraphQL Request:')) {
          const operationName = args[0].split(':')[1]?.trim() || 'Unknown';
          setEvents(prev => [
            ...prev, 
            {
              id: `req-${Date.now()}`,
              type: 'request',
              operationName,
              timestamp: new Date().toISOString(),
              data: args[1]
            }
          ]);
        } else if (args[0].includes('GraphQL Response:')) {
          const operationName = args[0].split(':')[1]?.trim() || 'Unknown';
          setEvents(prev => [
            ...prev, 
            {
              id: `res-${Date.now()}`,
              type: 'response',
              operationName,
              timestamp: new Date().toISOString(),
              data: args[1],
              hasNext: args[1]?.hasNext
            }
          ]);
        }
      }
    };
    
    // Restore original console.log on cleanup
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  // Keep only the last 20 events
  useEffect(() => {
    if (events.length > 20) {
      setEvents(prev => prev.slice(prev.length - 20));
    }
  }, [events]);

  if (!expanded) {
    return (
      <button 
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
        onClick={() => setExpanded(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-white rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <h3 className="font-bold text-sm">GraphQL Network Monitor</h3>
        <button 
          className="text-white hover:text-gray-300"
          onClick={() => setExpanded(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-auto flex-grow text-xs p-2 bg-gray-900 text-green-400 font-mono">
        {events.length === 0 ? (
          <div className="text-gray-500 italic p-2">No network activity yet...</div>
        ) : (
          <div className="space-y-2">
            {events.map(event => (
              <div 
                key={event.id} 
                className={`p-2 rounded ${
                  event.type === 'request' 
                    ? 'bg-blue-900 bg-opacity-30 border-l-4 border-blue-500' 
                    : event.hasNext 
                      ? 'bg-purple-900 bg-opacity-30 border-l-4 border-purple-500'
                      : 'bg-green-900 bg-opacity-30 border-l-4 border-green-500'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-bold">
                    {event.type === 'request' ? '→ Request:' : '← Response:'} {event.operationName}
                  </span>
                  <span className="text-gray-400">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                {event.type === 'response' && (
                  <div className="mt-1">
                    {event.hasNext && (
                      <div className="text-purple-400 mb-1">
                        ⏳ Deferred content - hasNext: true
                      </div>
                    )}
                    {event.data?.data && (
                      <div className="truncate">
                        Data: {JSON.stringify(event.data?.data).substring(0, 50)}...
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-gray-800 text-xs text-gray-400 p-1 text-center">
        Showing last {events.length} events
      </div>
    </div>
  );
};

export default NetworkMonitor; 