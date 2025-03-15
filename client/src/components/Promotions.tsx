import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '../graphql/queries';

const Promotions: React.FC = () => {
  const { data, loading } = useQuery(HOME_PAGE_QUERY);
  const promotions = data?.promotions || [];
  
  // State to track which promotion details are expanded
  const [expandedPromo, setExpandedPromo] = useState<string | null>(null);
  
  const togglePromoDetails = (id: string) => {
    setExpandedPromo(expandedPromo === id ? null : id);
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Picked out for you</h2>
        
        {loading && promotions.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="ee-card h-64 animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {promotions.map(promo => (
              <div key={promo.id} className="ee-card relative overflow-hidden group">
                {/* Promo Image */}
                <div className="h-32 bg-gray-100 rounded mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    Image: {promo.title}
                  </div>
                </div>
                
                {/* Promo Content */}
                <h3 className="text-sm font-bold">{promo.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{promo.description}</p>
                
                {/* Action Button */}
                <div className="mt-3">
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors py-1 px-3 rounded-full">
                    {promo.title.includes('Upgrade') ? 'Upgrade early' : 'Add to your account'}
                  </button>
                </div>
                
                {/* Show "loading" indicator while details are being deferred */}
                {expandedPromo === promo.id && !promo.details && (
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <div className="lazy-load-indicator w-3 h-3"></div>
                    <span className="ml-2">Loading details...</span>
                  </div>
                )}
                
                {/* Deferred Promo Details */}
                {expandedPromo === promo.id && promo.details && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                    <p className="font-medium">Valid until: {promo.details.validUntil || 'Ongoing'}</p>
                    <p className="mt-1">{promo.details.termsAndConditions}</p>
                    
                    {/* Benefits loaded via @stream */}
                    {promo.details.benefits && promo.details.benefits.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium">Benefits:</p>
                        <ul className="list-disc list-inside mt-1">
                          {promo.details.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-600">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Toggle Details Button */}
                <button 
                  className="absolute bottom-2 right-2 text-xs text-ee-teal hover:underline"
                  onClick={() => togglePromoDetails(promo.id)}
                >
                  {expandedPromo === promo.id ? 'Hide details' : 'Show details'}
                </button>
              </div>
            ))}
            
            {/* Loading indicator for streaming in more promotions */}
            {loading && promotions.length > 0 && (
              <div className="ee-card flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="lazy-load-indicator mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading more offers...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotions;
