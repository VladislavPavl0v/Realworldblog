/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../loader';
import { SIGN_IN_PATH } from '../../routers/routePaths';

function PrivateRoute({ element }) {
  const isAuth = useSelector((state) => state.blog.user && !!state.blog.user.token);
  const loading = useSelector((state) => state.blog.loading);

  if (loading) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to={SIGN_IN_PATH} replace />;
  }

  return element;
}
export default PrivateRoute;
