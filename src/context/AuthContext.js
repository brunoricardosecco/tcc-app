import React, { useState, useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { createContext } from 'use-context-selector';
import api from '../services/api';

import {
  authenticate as authenticateRequest,
  signUp as signUpRequest,
} from '../services/requests/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = useCallback(async ({ email, password }) => {
    try {
      setIsLoading((prevState) => !prevState);

      const { data } = await authenticateRequest({ email, password });
      api.defaults.headers.authorization = `Bearer ${data.access_token}`;
      setUser(data.user);
    } catch (error) {
      console.log(error.response);
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: error.response?.data?.message,
      });
    } finally {
      setIsLoading((prevState) => !prevState);
    }
  }, []);

  const signUp = useCallback(
    async ({ email, name, password, passwordConfirmation, image, goBack }) => {
      try {
        setIsLoading((prevState) => !prevState);

        const form = new FormData();
        form.append('file', image);
        form.append('name', name);
        form.append('email', email);
        form.append('password', password);
        form.append('passwordConfirmation', passwordConfirmation);

        await signUpRequest(form);
        showMessage({
          type: 'success',
          icon: 'success',
          message:
            'Cadastro criado com sucesso, por favor entre no aplicativo ❤️',
          duration: 4500,
        });
        goBack();
      } catch (error) {
        showMessage({
          type: 'warning',
          icon: 'warning',
          message: error.response?.data?.message,
        });
      } finally {
        setIsLoading((prevState) => !prevState);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    api.defaults.headers.authorization = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        authenticate,
        isLoading,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
