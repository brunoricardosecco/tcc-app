import React, { useState, useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { createContext } from 'use-context-selector';
import api from '../services/api';

import { authenticate as authenticateRequest } from '../services/requests/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = useCallback(async ({ email, password }) => {
    try {
      setIsLoading((prevState) => !prevState);

      const { data } = await authenticateRequest({ email, password });
      setUser(data.user);
    } catch (errors) {
      console.log(errors.response);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: errors.response?.data?.message,
      });
    } finally {
      setIsLoading((prevState) => !prevState);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    api.defaults.headers.authentication = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLogged: !!user, authenticate, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
