import React from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';
import { Task } from '../types';

const TopTasks: React.FC = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const tasks = data?.topTasks || [];
  const billInfo = data?.currentUser?.billInformation;

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Top Tasks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bill Information Card */}
          <div className="ee-card bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <h3 className="text-sm font-medium mb-1">Latest bill</h3>
            {loading || !billInfo ? (
              <div className="animate-pulse">
                <div className="h-8 w-24 bg-teal-400 rounded mb-2"></div>
                <div className="h-4 w-12 bg-teal-400 rounded"></div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold mb-1">£{billInfo.amount.toFixed(2)}</div>
                <div className="flex items-center text-xs">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-300 mr-1"></span>
                  <span>{billInfo.isPaid ? 'Paid' : 'Due soon'}</span>
                </div>
                <button className="mt-3 text-xs bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors py-1 px-3 rounded-full">
                  View my bill
                </button>
              </>
            )}
          </div>
          
          {/* Data Usage Card */}
          <div className="ee-card flex items-center">
            <div className="mr-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            </div>
            <div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-medium text-gray-900">Unlimited Data</h3>
                  <p className="text-xs text-gray-500">Never worry about limits</p>
                </>
              )}
            </div>
          </div>
          
          {/* Phone Details Card */}
          <div className="ee-card flex justify-between items-center">
            <div>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-medium text-gray-900">Device details</h3>
                  <p className="text-xs text-gray-500">{data?.currentUser?.phoneNumber || '07XXX XXX XXX'}</p>
                  <button className="mt-1 text-xs text-blue-600 hover:underline">
                    View full usage
                  </button>
                </>
              )}
            </div>
            <div className="w-12 h-20 bg-gray-100 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Visual lazy loading indicator for streamed tasks */}
        {loading && tasks.length === 0 && (
          <div className="mt-4 flex items-center justify-center">
            <div className="lazy-load-indicator"></div>
            <span className="ml-2 text-sm text-gray-500">Loading your personalized tasks...</span>
          </div>
        )}
        
        {/* Show tasks as they stream in */}
        {tasks.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {tasks.map((task: Task) => (
              <div key={task.id} className="ee-card text-center">
                <div className="w-10 h-10 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium">{task.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTasks;
