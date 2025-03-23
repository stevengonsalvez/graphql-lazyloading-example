import React from 'react';

interface MobileAccountDetailsProps {
  accountNumber?: string;
  name?: string | null;
  phoneNumber?: string | null;
  plan?: string | null;
  dataUsage?: number | null;
  dataLimit?: number | null;
  nextBill?: string | null;
  billAmount?: string | null;
  isLoading?: boolean;
}

const MobileAccountDetails: React.FC<MobileAccountDetailsProps> = ({
  accountNumber = '210078219',
  name = null,
  phoneNumber = null,
  plan = null,
  dataUsage = null,
  dataLimit = null,
  nextBill = null,
  billAmount = null,
  isLoading = false
}) => {
  // Calculate percentage of data used if we have the data
  const dataPercentage = (dataUsage !== null && dataLimit !== null && dataLimit > 0) 
    ? (dataUsage / dataLimit) * 100 
    : 0;
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );
  
  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold h-7">
            {name !== null ? name : <LoadingSpinner />}
          </h2>
          <p className="text-gray-400 text-sm h-5">
            {phoneNumber !== null ? phoneNumber : <LoadingSpinner />}
          </p>
          <p className="text-gray-400 text-sm">Account: {accountNumber}</p>
        </div>
        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium h-6">
          {plan !== null ? plan : <LoadingSpinner />}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Data usage</span>
          <span className="text-sm h-5 min-w-[80px] flex justify-end">
            {dataUsage !== null && dataLimit !== null ? 
              `${dataUsage}GB / ${dataLimit}GB` : 
              <LoadingSpinner />
            }
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          {dataUsage !== null && dataLimit !== null ? (
            <div 
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${dataPercentage}%` }}
            ></div>
          ) : (
            <div className="h-2.5 w-full bg-gray-700 animate-pulse"></div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Next bill</p>
          <p className="font-bold h-6">
            {nextBill !== null ? nextBill : <LoadingSpinner />}
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Bill amount</p>
          <p className="font-bold h-6">
            {billAmount !== null ? billAmount : <LoadingSpinner />}
          </p>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gray-800 pt-4">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full w-full font-medium">
          View Account Details
        </button>
      </div>
    </div>
  );
};

export default MobileAccountDetails; 