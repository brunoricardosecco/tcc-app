import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, isLogged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
