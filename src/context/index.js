import React from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';

export default function AppProvider({ children }) {
  return (
    <WalletProvider>
      <AuthProvider>{children}</AuthProvider>
    </WalletProvider>
  );
}
