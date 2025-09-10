import { useState,useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  function handleClickOutside(event) {
    if (servicesRef.current && !servicesRef.current.contains(event.target)) {
      setIsServicesOpen(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside, 400);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const services = [
    { name: 'IT Training', path: '/education' },
    { name: 'Software Services', path: '/software-services' },
    { name: 'Graphic Design', path: '/graphic-design' },
    { name: 'Cosmetology', path: '/cosmetology' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Osij Group
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group" ref={servicesRef} onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className="text-gray-700 hover:text-blue-600 focus:outline-none" onClick={() => setIsServicesOpen((open) => !open)} type='button'>
                
                Services 
              </button>
              <div className={`absolute ${isServicesOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-lg mt-2 p-2 w-48 z-50`}>
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded" onClick={() => setIsServicesOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <motion.span 
              className="text-blue-700 font-bold ml-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{scale: 1.05, color: 'red'}}
              transition={{ duration: 0.5 }}
              onClick={() => navigate('/profile')}
                >
                {user?.username}
                </motion.span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700">About</Link>
              
              {/* Mobile Services Submenu */}
              <div>
                <div className="px-3 py-2 text-gray-700 font-semibold">Services</div>
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-6 py-2 text-gray-600 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>

              <Link to="/contact" className="block px-3 py-2 text-gray-700">Contact</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700">Dashboard</Link>
                  <div className="px-3 py-2 text-gray-700">Welcome, {user?.username}</div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700">Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-blue-600">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;