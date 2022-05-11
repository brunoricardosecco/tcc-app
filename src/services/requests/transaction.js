import api from '../api';

export const storeTransaction = (transaction) =>
  api.post('/transactions', transaction);

export const getWallet = (walletId) => api.get(`/wallets/${walletId}`);

export const getWalletYears = (walletId) =>
  api.get(`/wallets/${walletId}/years`);

export const getWalletYearsProfit = (walletId, year) =>
  api.get(`/wallets/${walletId}/year/${year}`);
