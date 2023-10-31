import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
  const isAuth = useSelector((state) => !!state.blog.user.token);

  if (!isAuth) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
