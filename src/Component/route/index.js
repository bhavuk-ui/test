// src/route.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Catalog from '../Component/Catalog';
import MyProject from '../Component/MyProject';
import Tools from '../Component/Tools';
import Settings from '../Component/Settings';
import Api from '../Component/Api';
import Help from '../Component/Help';
import Login from '../Component/auth/Login';
import ProtectedRoute from './protectedRoute';
import Layout from './layout';
import { useAuth } from '../SupabaseAuth/auth/authContext';

const RouteContext = () => {
  const { user } = useAuth();

  const routeComponents = [
    { element: <Catalog />, pathname: '/dashboard' },
    { element: <MyProject />, pathname: '/myproject' },
    { element: <Settings />, pathname: '/settings' },
    { element: <Tools />, pathname: '/tools' },
    { element: <Api />, pathname: '/api' },
    { element: <Help />, pathname: '/help' },
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      {routeComponents.map((route, index) => (
        <Route
          key={index}
          path={route.pathname}
          element={
            <ProtectedRoute>
              <Layout>{route.element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default RouteContext;
