import { MOCK_WALLET } from "@/mocks/wallet";
import { useWalletStore, WalletData } from "@/stores/wallet";

class WalletService {
  private getStore() {
    return useWalletStore.getState();
  }

  async connect(): Promise<void> {
    const walletData: WalletData = {
      address: MOCK_WALLET.address,
      usdcBalance: MOCK_WALLET.usdcBalance,
      chainId: MOCK_WALLET.chainId,
      networkName: MOCK_WALLET.networkName,
    };

    this.getStore().connect(walletData);
  }

  async disconnect(): Promise<void> {
    this.getStore().disconnect();
  }
}

export const walletService = new WalletService();

export const useWallet = () => useWalletStore((state) => state.wallet);
