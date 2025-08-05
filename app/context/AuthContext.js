import React, { createContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers } from '../mockUsers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

   const login = async (username, password) => {
    const matchedUser = mockUsers.find(u => u.username === username && u.password === password);
    if (matchedUser) {
      setUser(matchedUser);
      return true;
    }
    return false;
  };

  const register = async (username, password, phone) => {
      const newUser = { username, password, phone };
      mockUsers.push(newUser);
      setUser(newUser);
      return true;
    };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
