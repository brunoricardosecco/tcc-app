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

  const changePassword = useCallback(
    async (data, goBack) => {
      try {
        setIsLoading((prevState) => !prevState);

        await api.post(`/user/${user.id}/change-password`, data);
        showMessage({
          type: 'success',
          icon: 'success',
          message: 'Senha alterada com sucesso!',
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
    [user]
  );

  const updateUserStatus = useCallback(async () => {
    try {
      setIsLoading((prevState) => !prevState);

      await api.put(`/user/${user.id}`, {
        isDiscoverable: !user.isDiscoverable,
      });
      setUser((p) => ({
        ...p,
        isDiscoverable: !p.isDiscoverable,
      }));
    } catch (error) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: error.response?.data?.message,
      });
    } finally {
      setIsLoading((prevState) => !prevState);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        authenticate,
        isLoading,
        logout,
        signUp,
        changePassword,
        updateUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
