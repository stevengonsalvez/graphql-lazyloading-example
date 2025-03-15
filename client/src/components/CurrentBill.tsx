import React from 'react';

type CurrentBillProps = {
  loading: boolean;
  billInfo: {
    amount: number;
    dueDate: string;
    isPaid: boolean;
    unlimitedData: boolean;
  } | null;
};

const CurrentBill: React.FC<CurrentBillProps> = ({ loading, billInfo }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Current Bill</h2>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-white bg-opacity-20 rounded w-24 mb-2"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-16 mb-1"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-32"></div>
          <div className="flex items-center mt-3">
            <div className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            <span className="text-sm">Loading bill details...</span>
          </div>
        </div>
      ) : !billInfo ? (
        <div className="text-white text-opacity-80">Bill information not available</div>
      ) : (
        <div>
          <div className="text-3xl font-bold">£{billInfo.amount.toFixed(2)}</div>
          <div className="flex items-center text-sm mb-1">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${billInfo.isPaid ? 'bg-green-300' : 'bg-yellow-300'}`}></span>
            <span>{billInfo.isPaid ? 'Paid' : 'Due soon'}</span>
          </div>
          <div className="text-sm">Due date: {billInfo.dueDate}</div>
          {billInfo.unlimitedData && (
            <div className="mt-2 inline-block bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              Unlimited Data Plan
            </div>
          )}
        </div>
      )}
      
      <div className="bg-purple-800 text-purple-100 text-xs p-2 mt-3 rounded">
        This component loads with @defer (second)
      </div>
    </div>
  );
};

export default CurrentBill; 