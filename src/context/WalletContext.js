import React, { useState, useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { createContext } from 'use-context-selector';

import { getWallet as getWalletRequest } from '../services/requests/transaction';

const WalletContext = createContext();

function WalletProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [actualAmount, setActualAmount] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);
  const [totalAssetPercent, setTotalAssetPercent] = useState(0);
  const [rentabilityPercent, setRentabilityPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getWallet = useCallback(async (walletId) => {
    try {
      setIsLoading((prevState) => !prevState);

      const { data } = await getWalletRequest(walletId);

      console.log(
        data.wallet.actualAmount,
        data.wallet.investedAmount,
        data.wallet.totalAsset,
        data.wallet.rentabilityPercent,
        data.wallet.totalAssetPercent
      );

      setTransactions(data.wallet.history);
      setActualAmount(data.wallet.actualAmount);
      setInvestedAmount(data.wallet.investedAmount);
      setTotalAsset(data.wallet.totalAsset);
      setTotalAssetPercent(data.wallet.totalAssetPercent);
      setRentabilityPercent(data.wallet.rentabilityPercent);
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

  return (
    <WalletContext.Provider
      value={{
        transactions,
        actualAmount,
        investedAmount,
        totalAsset,
        totalAssetPercent,
        rentabilityPercent,
        isLoading,
        getWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
