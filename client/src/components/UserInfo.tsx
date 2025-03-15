import React from 'react';

type UserInfoProps = {
  loading: boolean;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
  } | null;
};

const UserInfo: React.FC<UserInfoProps> = ({ loading, user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">User Information</h2>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      ) : !user ? (
        <div className="text-gray-500">User information not available</div>
      ) : (
        <div>
          <div className="text-xl font-semibold">{user.name}</div>
          <div className="text-gray-600">{user.phoneNumber}</div>
          <div className="text-xs text-gray-400 mt-1">ID: {user.id}</div>
        </div>
      )}
      
      <div className="bg-blue-100 text-blue-800 text-xs p-2 mt-3 rounded">
        This component loads immediately
      </div>
    </div>
  );
};

export default UserInfo; 