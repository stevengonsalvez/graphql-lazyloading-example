import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MOBILE_APP_QUERY_LAZY, MOBILE_APP_QUERY_EAGER } from '../graphql/queries';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';
import MobileAccountDetails from './MobileAccountDetails';

const MobileAppComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manage');
  
  // Track the loading state of each data part
  const [baseInfoLoaded, setBaseInfoLoaded] = useState(false);
  const [dataUsageLoaded, setDataUsageLoaded] = useState(false);
  const [billingInfoLoaded, setBillingInfoLoaded] = useState(false);

  // Execute the lazy loading query with @defer
  const { 
    data: lazyData, 
    loading: lazyLoading, 
  } = useQuery(MOBILE_APP_QUERY_LAZY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });
  
  // Execute the eager loading query (no @defer)
  const { 
    data: eagerData, 
    loading: eagerLoading, 
  } = useQuery(MOBILE_APP_QUERY_EAGER, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  // Log data as it arrives and track loading state
  useEffect(() => {
    if (lazyData) {
      console.log('Base user data loaded:', lazyData);
      
      if (lazyData.currentUser?.mobileDetails) {
        console.log('Mobile details base info loaded');
        setBaseInfoLoaded(true);
        
        // Check if data usage is loaded
        if (lazyData.currentUser.mobileDetails.dataUsage !== undefined) {
          console.log('Data usage info loaded');
          setDataUsageLoaded(true);
        }
        
        // Check if billing info is loaded
        if (lazyData.currentUser.mobileDetails.billAmount !== undefined) {
          console.log('Billing info loaded');
          setBillingInfoLoaded(true);
        }
      }
    }
  }, [lazyData]);

  // Reset loading states when component unmounts or on refresh
  useEffect(() => {
    return () => {
      setBaseInfoLoaded(false);
      setDataUsageLoaded(false);
      setBillingInfoLoaded(false);
    };
  }, []);

  // Extract user data from both queries
  const lazyUser = lazyData?.currentUser;
  const lazyMobileDetails = lazyUser?.mobileDetails;
  
  const eagerUser = eagerData?.currentUser;
  const eagerMobileDetails = eagerUser?.mobileDetails;

  return (
    <div className="grid grid-cols-2 gap-8 max-w-full mx-auto p-4 h-screen bg-gray-100">
      {/* Left column - Lazy Loading with @defer */}
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3 text-center bg-green-100 p-2 rounded-lg">Progressive Loading from graphql</h2>
        
        <div className="bg-black text-white overflow-hidden rounded-3xl shadow-lg border border-gray-800 w-[390px] h-[800px] mx-auto relative">
          <MobileTopBar />
          
          {/* Scrollable container */}
          <div className="overflow-y-auto h-[calc(100%-110px)]">
            {/* Manage Page with Menu (smaller widgets) */}
            <div className="px-4 pt-2">
              <h1 className="text-3xl font-bold mb-4">Manage</h1>
              
              <div className="grid grid-cols-4 gap-1 mb-4">
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Billing</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Mobile</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Subs</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Orders</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-1 mb-4">
                <div className="bg-black border border-yellow-400 rounded-lg p-1 flex flex-col items-center justify-center relative h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Broadband</div>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-lg p-1 flex flex-col items-center justify-center relative h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">TV & Sport</div>
                </div>
                
                <div className="col-span-2"></div>
              </div>
            </div>
            
            {/* Display debug info about what data is loaded */}
            <div className="px-3 py-2 bg-gray-900 text-xs mb-2">
              <div className="grid grid-cols-3 gap-1">
                <div className={`p-1 rounded ${lazyUser ? 'bg-green-800' : 'bg-red-800'}`}>
                  Account: {lazyUser ? 'Loaded' : 'Loading...'}
                </div>
                <div className={`p-1 rounded ${baseInfoLoaded ? 'bg-green-800' : 'bg-red-800'}`}>
                  Details: {baseInfoLoaded ? 'Loaded' : 'Loading...'}
                </div>
                <div className={`p-1 rounded ${dataUsageLoaded ? 'bg-green-800' : 'bg-red-800'}`}>
                  Data: {dataUsageLoaded ? 'Loaded' : 'Loading...'}
                </div>
                <div className={`p-1 rounded ${billingInfoLoaded ? 'bg-green-800' : 'bg-red-800'} col-span-3`}>
                  Billing: {billingInfoLoaded ? 'Loaded' : 'Loading...'}
                </div>
              </div>
            </div>
            
            {/* Mobile account label below the debug info */}
            <div className="px-3 py-2 text-gray-400 mb-2">
              Mobile account: {lazyUser?.accountNumber || (
                <span className="inline-flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-1 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              )}
            </div>
            
            {/* Account Details Section - With progressive loading spinners */}
            <div className="px-3 mb-4">
              <MobileAccountDetails 
                accountNumber={lazyUser?.accountNumber || '210078219'}
                name={lazyUser?.name}
                phoneNumber={baseInfoLoaded ? lazyMobileDetails?.phoneNumber : null}
                plan={baseInfoLoaded ? lazyMobileDetails?.planName : null}
                dataUsage={dataUsageLoaded ? lazyMobileDetails?.dataUsage : null}
                dataLimit={dataUsageLoaded ? lazyMobileDetails?.dataLimit : null}
                nextBill={billingInfoLoaded ? lazyMobileDetails?.debitDate : null}
                billAmount={billingInfoLoaded && lazyMobileDetails?.billAmount !== undefined ? 
                  `£${lazyMobileDetails.billAmount.toFixed(2)}` : null}
                isLoading={lazyLoading}
              />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
      
      {/* Right column - Eager Loading (with layout shift) */}
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3 text-center bg-gray-300 p-2 rounded-lg">Current Loading in the app</h2>
        
        <div className="bg-black text-white overflow-hidden rounded-3xl shadow-lg border border-gray-800 w-[390px] h-[800px] mx-auto relative">
          <MobileTopBar />
          
          {/* Scrollable container */}
          <div className="overflow-y-auto h-[calc(100%-110px)]">
            {/* Manage Page with smaller widgets */}
            <div className="px-4 pt-2">
              <h1 className="text-3xl font-bold mb-4">Manage</h1>
              
              <div className="grid grid-cols-4 gap-1 mb-4">
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Billing</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Mobile</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Subs</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-center h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Orders</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-1 mb-4">
                <div className="bg-black border border-yellow-400 rounded-lg p-1 flex flex-col items-center justify-center relative h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">Broadband</div>
                </div>
                
                <div className="bg-black border border-gray-800 rounded-lg p-1 flex flex-col items-center justify-center relative h-[60px]">
                  <div className="text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center text-xs">TV & Sport</div>
                </div>
                
                <div className="col-span-2"></div>
              </div>
            </div>
            
            {/* Display debug info about what data is loaded */}
            <div className="px-3 py-2 bg-gray-900 text-xs mb-2">
              {eagerLoading ? (
                <p>Loading all data at once...</p>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  <div className={`p-1 rounded ${eagerUser ? 'bg-green-800' : 'bg-red-800'}`}>
                    Account: {eagerUser ? 'Loaded' : 'Loading...'}
                  </div>
                  <div className={`p-1 rounded ${eagerMobileDetails ? 'bg-green-800' : 'bg-red-800'}`}>
                    Details: {eagerMobileDetails ? 'Loaded' : 'Loading...'}
                  </div>
                  <div className={`p-1 rounded ${eagerMobileDetails?.dataUsage !== undefined ? 'bg-green-800' : 'bg-red-800'}`}>
                    Data: {eagerMobileDetails?.dataUsage !== undefined ? 'Loaded' : 'Loading...'}
                  </div>
                  <div className={`p-1 rounded ${eagerMobileDetails?.billAmount !== undefined ? 'bg-green-800' : 'bg-red-800'} col-span-3`}>
                    Billing: {eagerMobileDetails?.billAmount !== undefined ? 'Loaded' : 'Loading...'}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile account label below the debug info */}
            <div className="px-3 py-2 text-gray-400 mb-2">
              Mobile account: {eagerUser?.accountNumber || (eagerLoading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-1 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : '')}
            </div>
            
            {/* During loading, show static content at top and bottom */}
            {(eagerLoading || !eagerMobileDetails) && (
              <>
                {/* Top static content */}
                <div className="px-3 py-2">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <h3 className="text-xl font-bold mb-2">Upcoming Payments</h3>
                    <p className="text-gray-400">No upcoming payments to display</p>
                  </div>
                </div>
                
                {/* Static Roaming section (from third screenshot) */}
                <div className="px-3 py-2 mt-2">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <h3 className="text-xl font-bold mb-2">Roaming</h3>
                    <p className="text-gray-400 mb-2">Check and manage your costs before you go away.</p>
                    <a href="#" className="text-yellow-400 underline">Check your roaming costs</a>
                  </div>
                </div>
                
                {/* Static Device Care section (from third screenshot) */}
                <div className="px-3 py-2 mt-2">
                  <div className="bg-gray-900 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">Device Care Extras</h3>
                      <div className="bg-gray-800 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-3">Awesome extras to keep your device in tip-top condition for longer.</p>
                    <a href="#" className="text-yellow-400 underline">Take a look</a>
                  </div>
                </div>
              </>
            )}
            
            {/* Dynamic content that causes layout shift when loaded */}
            {!eagerLoading && eagerMobileDetails && (
              <div className="px-3 mb-4">
                <MobileAccountDetails 
                  accountNumber={eagerUser?.accountNumber || '210078219'}
                  name={eagerUser?.name}
                  phoneNumber={eagerMobileDetails?.phoneNumber}
                  plan={eagerMobileDetails?.planName}
                  dataUsage={eagerMobileDetails?.dataUsage}
                  dataLimit={eagerMobileDetails?.dataLimit}
                  nextBill={eagerMobileDetails?.debitDate}
                  billAmount={eagerMobileDetails?.billAmount !== undefined ? `£${eagerMobileDetails.billAmount.toFixed(2)}` : null}
                />
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="col-span-2 text-center text-sm mt-4 p-4 bg-gray-200 rounded-lg">
        <h3 className="font-bold mb-2">GraphQL Loading Pattern Comparison</h3>
        <p>Left side (green): Uses @defer for progressive loading with staggered data loading:</p>
        <ul className="list-disc list-inside text-left ml-10">
          <li>Account info loads first (~1 sec)</li>
          <li>Basic mobile details load next (~2 sec)</li>
          <li>Plan & phone number load next (~3-4 sec)</li>
          <li>Data usage loads next (~6 sec)</li>
          <li>Billing info loads last (~10 sec)</li>
        </ul>
        <p className="mt-2">Right side (grey): Traditional loading. Static elements appear first, dynamic content loads later causing layout shift.</p>
        <p className="mt-2 font-bold">Refresh the page to see the loading behaviors in action!</p>
      </div>
    </div>
  );
};

export default MobileAppComparison; 