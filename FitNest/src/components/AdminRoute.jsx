import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  if (!userId || userRole !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;