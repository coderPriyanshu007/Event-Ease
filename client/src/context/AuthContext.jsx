import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(true);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
   
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    
  };

  const logout = async () => {
    setUser(null);
    setToken('');
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
  };

  const setAuth = (data) => {
    login(data.user, data.token);
  };

  //auto logout of token's expiration
  useEffect(() => {
  const checkAuth = () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      if (timeUntilExpiry <= 0) {
        logout();
      } else {
        setIsAuthenticated(true);
        const timeout = setTimeout(logout, timeUntilExpiry);
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error('Token decode failed:', err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setAuth, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
