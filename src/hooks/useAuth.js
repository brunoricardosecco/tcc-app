import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const isLogged = useContextSelector(AuthContext, (auth) => auth.isLogged);
  const user = useContextSelector(AuthContext, (auth) => auth.user);
  const isLoading = useContextSelector(AuthContext, (auth) => auth.isLoading);
  const authenticate = useContextSelector(
    AuthContext,
    (auth) => auth.authenticate
  );
  const logout = useContextSelector(AuthContext, (auth) => auth.logout);
  const signUp = useContextSelector(AuthContext, (auth) => auth.signUp);
  const changePassword = useContextSelector(
    AuthContext,
    (auth) => auth.changePassword
  );
  const updateUserStatus = useContextSelector(
    AuthContext,
    (auth) => auth.updateUserStatus
  );

  return {
    isLogged,
    authenticate,
    logout,
    isLoading,
    signUp,
    user,
    changePassword,
    updateUserStatus,
  };
}
