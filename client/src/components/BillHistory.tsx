import React from 'react';

type BillHistoryItem = {
  date: string;
  amount: number;
  status: string;
};

type BillHistoryProps = {
  loading: boolean;
  historyItems: BillHistoryItem[] | null;
};

const BillHistory: React.FC<BillHistoryProps> = ({ loading, historyItems }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-2">Bill History</h2>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="w-4 h-4 mr-2 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
            <span className="text-sm text-indigo-500">Loading history...</span>
          </div>
        </div>
      ) : !historyItems || historyItems.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No billing history available</div>
      ) : (
        <div className="divide-y">
          <div className="grid grid-cols-3 py-2 font-semibold text-sm text-gray-600">
            <div>Date</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Status</div>
          </div>
          
          {historyItems.map((item, index) => (
            <div key={index} className="grid grid-cols-3 py-2 text-sm">
              <div>{item.date}</div>
              <div className="text-right">£{item.amount.toFixed(2)}</div>
              <div className={`text-right ${item.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-green-100 text-green-800 text-xs p-2 mt-3 rounded">
        This component loads with nested @defer (last)
      </div>
    </div>
  );
};

export default BillHistory; 