import { MOCK_TARGET_NETWORK } from "@/mocks/network";
import {
  useNetworkStore,
} from "@/stores/network";
import { useWalletStore } from "@/stores/wallet";

class NetworkService {
  private getNetworkStore() {
    return useNetworkStore.getState();
  }

  private getWalletStore() {
    return useWalletStore.getState();
  }

  async detectNetwork(): Promise<void> {
    const { setIsChecking, setCurrentChainId, setError } =
      this.getNetworkStore();
    const { wallet } = this.getWalletStore();

    if (!wallet.connected) {
      setCurrentChainId(null);
      return;
    }

    setIsChecking(true);

    try {
      const chainId = wallet.chainId;

      setCurrentChainId(chainId);
    } catch {
      setError("Failed to detect network");
    } finally {
      setIsChecking(false);
    }
  }

  async switchToTargetNetwork(): Promise<boolean> {
    const { setIsChecking, setCurrentChainId, setError } =
      this.getNetworkStore();

    setIsChecking(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = Math.random() > 0.1;

      if (success) {
        const { wallet } = this.getWalletStore();
        if (wallet.connected) {
          this.getWalletStore().connect({
            address: wallet.address,
            usdcBalance: wallet.usdcBalance,
            chainId: MOCK_TARGET_NETWORK.chainId,
            networkName: MOCK_TARGET_NETWORK.name,
          });
        }

        setCurrentChainId(MOCK_TARGET_NETWORK.chainId);
        return true;
      } else {
        setError("User rejected network switch");
        return false;
      }
    } catch {
      setError("Failed to switch network");
      return false;
    } finally {
      setIsChecking(false);
    }
  }
}

export const networkService = new NetworkService();

export const useNetwork = () => useNetworkStore((state) => state);
