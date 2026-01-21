import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureStorage } from "@/utils/secure-storage";

export interface Wallet {
  connected: boolean;
  address: string;
  truncatedAddress: string;
  usdcBalance: number;
  chainId: number;
  networkName: string;
}

export type WalletData = Omit<Wallet, "connected" | "truncatedAddress">;

interface WalletState {
  wallet: Wallet;
  connect: (data: WalletData) => void;
  disconnect: () => void;
  setUsdcBalance: (balance: number) => void;
}

const defaultWallet: Wallet = {
  connected: false,
  address: "",
  truncatedAddress: "",
  usdcBalance: 0,
  chainId: 0,
  networkName: "",
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallet: defaultWallet,
      connect: (data) =>
        set({
          wallet: {
            ...data,
            connected: true,
            truncatedAddress: `${data.address.slice(0, 6)}...${data.address.slice(-4)}`,
          },
        }),
      disconnect: () =>
        set({
          wallet: defaultWallet,
        }),
      setUsdcBalance: (balance) =>
        set((state) => ({
          wallet: { ...state.wallet, usdcBalance: balance },
        })),
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
