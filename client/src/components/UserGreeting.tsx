import React from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';

interface UserGreetingProps {
  // Props if needed
}

const UserGreeting: React.FC<UserGreetingProps> = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const user = data?.currentUser;

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        {/* Greeting Section */}
        <h1 className="text-2xl font-bold mb-4">
          {loading ? (
            <span className="loading-skeleton w-48 h-8 inline-block"></span>
          ) : (
            `Good Morning, ${user?.name || 'User'}`
          )}
        </h1>

        {/* Promotional Banner */}
        <div className="bg-black text-white rounded-lg p-6 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Upgrade to the Galaxy S25 Series</h2>
              <p className="text-sm md:text-base mb-4">Get up to £450 when you trade in your device at our retail store</p>
              <button className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                Upgrade to Galaxy S25 Ultra
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              {/* Phone image would go here */}
              <div className="w-32 h-32 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
          {/* Visual effect elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 opacity-50 rounded-l-full transform translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default UserGreeting;
