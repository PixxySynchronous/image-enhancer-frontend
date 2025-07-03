import React from 'react';
import { Navigate } from 'react-router-dom';


/**
 * RequireAuth is a wrapper component used to protect private routes.
 * It checks if the user has a valid auth token stored in localStorage.
 * If not authenticated, it redirects the user to the login page.Prevents infinite looping
 */

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
