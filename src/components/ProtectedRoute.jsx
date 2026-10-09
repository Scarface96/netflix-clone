import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, checking } = UserAuth();
  const location = useLocation();

  // Wait for Firebase to restore the saved session, so a refresh doesn't bounce you out.
  if (checking) return <div className='min-h-screen bg-black' />;
  if (!user) return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  return children;
};

export default ProtectedRoute;
