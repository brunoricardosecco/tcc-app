import { useContextSelector } from 'use-context-selector';
import { WalletContext } from '../context/WalletContext';

export function useWallet() {
  const isLoading = useContextSelector(
    WalletContext,
    (wallet) => wallet.isLoading
  );
  const actualAmount = useContextSelector(
    WalletContext,
    (wallet) => wallet.actualAmount
  );
  const investedAmount = useContextSelector(
    WalletContext,
    (wallet) => wallet.investedAmount
  );
  const rentabilityPercent = useContextSelector(
    WalletContext,
    (wallet) => wallet.rentabilityPercent
  );
  const getWallet = useContextSelector(
    WalletContext,
    (wallet) => wallet.getWallet
  );
  const totalAssetPercent = useContextSelector(
    WalletContext,
    (wallet) => wallet.totalAssetPercent
  );
  const totalAsset = useContextSelector(
    WalletContext,
    (wallet) => wallet.totalAsset
  );

  return {
    isLoading,
    actualAmount,
    investedAmount,
    rentabilityPercent,
    getWallet,
    totalAsset,
    totalAssetPercent,
  };
}
