import React from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';

const Categories: React.FC = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const categories = data?.categories || [];

  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Shop by category</h2>
        
        {loading && categories.length === 0 ? (
          <div className="flex justify-center">
            <div className="lazy-load-indicator"></div>
            <span className="ml-2 text-sm text-gray-500">Loading categories...</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(category => (
              <div key={category.id} className="text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                  {/* Icon placeholder */}
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <p className="text-sm">{category.name}</p>
              </div>
            ))}
            
            {/* Loading indicator for more categories */}
            {loading && categories.length > 0 && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2 animate-pulse">
                  <div className="lazy-load-indicator"></div>
                </div>
                <p className="text-sm text-gray-400">Loading...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
