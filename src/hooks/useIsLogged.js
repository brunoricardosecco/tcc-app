import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../context/AuthContext';

export function useIsLogged() {
  const isLogged = useContextSelector(AuthContext, (auth) => auth.isLogged);

  return { isLogged };
}
