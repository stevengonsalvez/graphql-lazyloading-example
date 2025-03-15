import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { USER_DEVICES_QUERY } from '../graphql/queries';

const Devices: React.FC = () => {
  const { data, loading } = useQuery(USER_DEVICES_QUERY);
  const devices = data?.userDevices || [];
  
  // State to track which device's details are expanded
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  
  const toggleDeviceDetails = (id: string) => {
    setExpandedDevice(expandedDevice === id ? null : id);
  };

  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="ee-section-title">Do you have another device with us?</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="mb-4 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold mb-2">With us?</h3>
              <p className="text-gray-600 mb-4">
                If you have a device missing from your account, such as an EE mobile or broadband, you can link it here. Manage all of your products in one place.
              </p>
              <button className="ee-button">
                Link a device
              </button>
            </div>
            
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Device illustration */}
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Display user devices from query */}
          {devices.length > 0 && (
            <div className="mt-8">
              <h4 className="font-medium mb-4">Your registered devices:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map(device => (
                  <div key={device.id} className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium">{device.name}</h5>
                        <p className="text-sm text-gray-500">{device.type}</p>
                      </div>
                    </div>
                    
                    {/* Toggle button for details */}
                    <button 
                      className="text-sm text-ee-teal hover:underline mt-3"
                      onClick={() => toggleDeviceDetails(device.id)}
                    >
                      {expandedDevice === device.id ? 'Hide details' : 'Show details'}
                    </button>
                    
                    {/* Deferred device details */}
                    {expandedDevice === device.id && (
                      <div className="mt-3">
                        {!device.technicalDetails ? (
                          <div className="flex items-center">
                            <div className="lazy-load-indicator"></div>
                            <span className="ml-2 text-sm text-gray-500">Loading device details...</span>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-3 rounded text-sm">
                            <p><strong>Serial:</strong> {device.technicalDetails.serialNumber}</p>
                            <p><strong>Model:</strong> {device.technicalDetails.model}</p>
                            <p><strong>Purchase Date:</strong> {device.technicalDetails.purchaseDate}</p>
                            <p><strong>Warranty Until:</strong> {device.technicalDetails.warrantyEnd}</p>
                            
                            {/* Support options via streaming */}
                            {device.technicalDetails.supportOptions && device.technicalDetails.supportOptions.length > 0 && (
                              <div className="mt-2">
                                <p className="font-medium">Support Options:</p>
                                <ul className="list-disc list-inside mt-1">
                                  {device.technicalDetails.supportOptions.map((option, index) => (
                                    <li key={index}>{option}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Loading indicator for streaming devices */}
          {loading && devices.length === 0 && (
            <div className="mt-6 flex justify-center">
              <div className="text-center">
                <div className="lazy-load-indicator mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Checking for registered devices...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devices;
