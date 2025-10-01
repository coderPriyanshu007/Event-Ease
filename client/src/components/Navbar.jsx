// src/components/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {  FiSettings, FiLogOut } from 'react-icons/fi';
import { FaTicketAlt, FaUserCircle } from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white bg-red-500  rounded-md px-3 py-2'
      : 'text-black hover:text-black hover:bg-gray-200  rounded-md px-3 py-2 transition-colors duration-300 ease-in';

  return (
    <nav className=" sticky top-0 z-10 backdrop-blur-md w-full  px-2 ">
      <div className=" px-6 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between relative">
          {/* Logo */}
          <NavLink to="/" className="flex items-center mr-4">
            <span className="hidden md:block text-black text-2xl font-bold ml-2">
              <span className='text-red-500'>Event</span> Ease
            </span>
          </NavLink>

          {/* Primary Links */}
          <div className="flex space-x-4">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>
            
            {/* Profile Dropdown */}
          {user ? (
            <div className=" relative  flex items-center" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center   text-white focus:outline-none"
              >
                <FaUserCircle className="text-4xl text-black" />
                </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="origin-top-right absolute right-0 top-[100%]  mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-start text-gray-700">
                        Hi,
                      </p>
                       <p className="font-semibold text-sm  text-indigo-500">{user.name} 😊</p>
                    </div>
                    
                      
                   
                    {user.role === 'admin' ?(
                      <NavLink
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    ><MdDashboard className="mr-2" /> Dashboard</NavLink>
                    ):(
                      ''
                    )}
                    
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        navigate('/auth');
                       
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-600/90"
                    >
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              
            </div>
          ) :
            <NavLink to="/auth" className={linkClass}>
              Sign In
            </NavLink>
          }
          </div>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
