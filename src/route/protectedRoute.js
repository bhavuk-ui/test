// src/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../SupabaseAuth/auth/authContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
