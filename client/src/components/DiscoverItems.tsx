import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';
import { DiscoverItem } from '../types';

const DiscoverItems: React.FC = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const discoverItems = data?.discoverItems || [];
  
  // State to track which item's additional info is visible
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const toggleItemInfo = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Discover</h2>
        
        {loading && discoverItems.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {discoverItems.map((item: DiscoverItem) => (
              <div key={item.id} className="group">
                {/* Item Image */}
                <div className="h-48 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    {item.title}
                  </div>
                </div>
                
                {/* Item Content */}
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                
                {/* Price if available */}
                {item.price && (
                  <p className="text-sm font-medium mt-2">
                    {item.price % 1 === 0 
                      ? `£${item.price}`
                      : `£${item.price.toFixed(2)}`}
                    {item.title.includes('month') && ' monthly'}
                  </p>
                )}
                
                {/* Deferred additional info */}
                {expandedItem === item.id && (
                  <>
                    {!item.additionalInfo && (
                      <div className="mt-2 flex items-center">
                        <div className="lazy-load-indicator w-3 h-3"></div>
                        <span className="ml-2 text-xs text-gray-500">Loading details...</span>
                      </div>
                    )}
                    
                    {item.additionalInfo && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                        {item.additionalInfo}
                      </div>
                    )}
                  </>
                )}
                
                {/* Action buttons */}
                <div className="mt-3 flex justify-between items-center">
                  <button className="text-sm border border-ee-teal text-ee-teal py-1 px-3 rounded hover:bg-ee-teal hover:text-white transition-colors">
                    {item.type === 'TV' ? 'Shop DTV100 Smart TV bundle' : 'Shop now'}
                  </button>
                  
                  <button 
                    onClick={() => toggleItemInfo(item.id)}
                    className="text-xs text-gray-500 hover:text-ee-teal"
                  >
                    {expandedItem === item.id ? 'Less info' : 'More info'}
                  </button>
                </div>
              </div>
            ))}
            
            {/* Loading indicator for streaming more items */}
            {loading && discoverItems.length > 0 && (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="lazy-load-indicator mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading more items...</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination indicator */}
        {discoverItems.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            <span className="w-2 h-2 rounded-full bg-ee-teal"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverItems;
