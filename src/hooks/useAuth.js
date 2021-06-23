import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const isLogged = useContextSelector(AuthContext, (auth) => auth.isLogged);
  const authenticate = useContextSelector(
    AuthContext,
    (auth) => auth.authenticate
  );
  const logout = useContextSelector(AuthContext, (auth) => auth.logout);
  const isLoading = useContextSelector(AuthContext, (auth) => auth.isLoading);

  return { isLogged, authenticate, logout, isLoading };
}
