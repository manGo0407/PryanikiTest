import React from 'react'
import { GuestRouteProps } from '../types';
import { Navigate } from 'react-router-dom';

export default function GuestRoute ({ isAuthenticated, redirectPath = '/home', children}: GuestRouteProps) {
  if(isAuthenticated) {
    return <Navigate to={redirectPath} replace/>
  } else {
    return <>{children}</>
  }
}
