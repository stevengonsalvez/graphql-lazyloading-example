import React from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';
import { AccountUpdate } from '../types';

const AccountUpdates: React.FC = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const updates = data?.currentUser?.accountUpdates || [];

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Account updates</h2>
        
        <div className="ee-card">
          <div className="flex items-start mb-4">
            <div className="p-2 bg-gray-100 rounded-full mr-3">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm">Going abroad?</h3>
              {loading ? (
                <div className="animate-pulse mt-1">
                  <div className="h-3 w-64 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-48 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <p className="text-xs text-gray-600">
                  Check changes to see your phone renewal and ensure you're set up to date.
                </p>
              )}
            </div>
          </div>
          
          {/* Show account updates as they stream in */}
          {updates.length > 0 ? (
            <div className="space-y-3">
              {updates.map((update: AccountUpdate) => (
                <div key={update.id} className="border-t pt-3">
                  <h4 className="text-sm font-medium">{update.message}</h4>
                  <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="mt-4 flex items-center justify-center">
              <div className="lazy-load-indicator"></div>
              <span className="ml-2 text-sm text-gray-500">Loading account updates...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No recent account updates.</p>
          )}
          
          <div className="mt-4 text-center">
            <button className="text-xs text-ee-teal hover:underline">
              See all updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdates;
