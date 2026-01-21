import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Email regex (same used in Register.jsx)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    // ---------------------------
    // FRONTEND VALIDATION
    // ---------------------------

    // Email Validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password Validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await api.post('/api/users/login', formData);

      // Store essentials
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userEmail', response.data.email);

      // Navigate based on role
      if (response.data.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);

      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Login failed. Please check your connection.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="rounded-xl border border-gray-200 bg-white py-8 px-6 w-full max-w-md shadow-[0px_4px_20px_0px_#0000000D]">
        
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
            </path>
          </svg>
        </div>

        <h3 className="mb-6 text-center text-xl font-bold text-gray-800">Quick Login</h3>

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
          </div>

          {/* Error */}
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700"
          >
            Sign In
          </button>

          <div className="mt-4 text-center space-y-2">
            <div>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot Password?</a>
            </div>
            <div>
              <Link to="/register" className="text-sm text-gray-600 hover:text-blue-600">
                Don't have an account? <span className="font-semibold">Sign up</span>
              </Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
