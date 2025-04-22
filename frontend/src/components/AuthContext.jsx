import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register function
  const register = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data;
  };

  // Login function
  const login = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user); // Update user state
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
