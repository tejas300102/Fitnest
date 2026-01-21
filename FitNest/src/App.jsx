import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Diets from './pages/Diets';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import BMI from './pages/BMI';
import Nutrition from './pages/Nutrition';
import Quotes from './pages/Quotes';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact'; // Import Contact Page
import Layout from './components/Layout';
// Import Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminWorkouts from './pages/AdminWorkouts';
import AdminDiets from './pages/AdminDiets';
import AdminRoute from './components/AdminRoute';

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  if (!userId) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

// Allow both users and admins to access user routes
const UserOrAdminRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  if (!userId) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

// Admin route wrapper also uses Layout
const ProtectedAdminRoute = ({ children }) => {
  return (
    <AdminRoute>
      <Layout>{children}</Layout>
    </AdminRoute>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />

          {/* User Routes - Accessible by both users and admins */}
          <Route path="/dashboard" element={<UserOrAdminRoute><Dashboard /></UserOrAdminRoute>} />
          <Route path="/workouts" element={<UserOrAdminRoute><Workouts /></UserOrAdminRoute>} />
          <Route path="/diets" element={<UserOrAdminRoute><Diets /></UserOrAdminRoute>} />
          <Route path="/progress" element={<UserOrAdminRoute><Progress /></UserOrAdminRoute>} />
          <Route path="/profile" element={<UserOrAdminRoute><Profile /></UserOrAdminRoute>} />
          <Route path="/bmi" element={<UserOrAdminRoute><BMI /></UserOrAdminRoute>} />
          <Route path="/nutrition" element={<UserOrAdminRoute><Nutrition /></UserOrAdminRoute>} />
          <Route path="/quotes" element={<UserOrAdminRoute><Quotes /></UserOrAdminRoute>} />
          <Route path="/contact" element={<UserOrAdminRoute><Contact /></UserOrAdminRoute>} /> {/* New Route */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
          <Route path="/admin/workouts" element={<ProtectedAdminRoute><AdminWorkouts /></ProtectedAdminRoute>} />
          <Route path="/admin/diets" element={<ProtectedAdminRoute><AdminDiets /></ProtectedAdminRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;