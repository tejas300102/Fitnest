import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/'); 
  };

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Diets', path: '/diets' },
    { name: 'Progress', path: '/progress' },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact', path: '/contact' }, // Added Contact Link here
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Users', path: '/admin/users' },
    { name: 'Content', path: '/workouts' },
  ];

  const navLinks = userRole === 'ADMIN' ? adminLinks : userLinks;

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      
      <Link to={userId ? (userRole === 'ADMIN' ? "/admin/dashboard" : "/dashboard") : "/"} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
           <path d="M20 38C29.941 38 38 29.941 38 20C38 10.059 29.941 2 20 2C10.059 2 2 10.059 2 20C2 29.941 10.059 38 20 38Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
           <path d="M11 20L17 26L29 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-bold tracking-tight">FitNest {userRole === 'ADMIN' && <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded ml-1">ADMIN</span>}</span>
      </Link>

      <ul className="md:flex hidden items-center gap-8">
        {userId && navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.path} 
              className="hover:text-indigo-600 font-medium transition text-sm uppercase tracking-wide"
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li>
          <Link 
            to="/about" 
            className="hover:text-indigo-600 font-medium transition text-sm uppercase tracking-wide"
          >
            About Us
          </Link>
        </li>
      </ul>

      <div className="hidden md:inline-block">
        {userId ? (
          <button 
            type="button" 
            onClick={handleLogout}
            className="bg-white text-gray-600 border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition-all px-6 h-11 rounded-full font-medium"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
             <Link to="/login">
                <button className="text-gray-600 hover:text-indigo-600 font-medium text-sm px-4 py-2 transition">
                    Login
                </button>
             </Link>
             <Link to="/register">
                <button className="bg-indigo-600 text-white text-sm hover:bg-indigo-700 active:scale-95 transition-all px-6 h-11 rounded-full shadow-lg shadow-indigo-200">
                    Get Started
                </button>
             </Link>
          </div>
        )}
      </div>

      <button 
        aria-label="menu-btn" 
        type="button" 
        className="menu-btn inline-block md:hidden active:scale-90 transition p-1"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 md:hidden shadow-xl border-t border-gray-100 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-200 z-50">
          <ul className="flex flex-col space-y-4 text-lg font-medium text-gray-600">
            {userId && navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="block hover:text-indigo-600 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/about" 
                className="block hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>

          <div className="border-t border-gray-100 pt-4">
            {userId ? (
              <button 
                type="button" 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full bg-white text-gray-600 border border-gray-300 text-sm hover:bg-gray-50 active:scale-95 transition-all h-11 rounded-full font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full text-gray-600 border border-gray-300 h-11 rounded-full hover:bg-gray-50 transition">Login</button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-indigo-600 text-white h-11 rounded-full hover:bg-indigo-700 transition shadow-md">Get Started</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;