import { MOCK_TARGET_NETWORK } from "@/mocks/network";
import { create } from "zustand";

export const TARGET_NETWORK = MOCK_TARGET_NETWORK;

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  isTestnet: boolean;
}

interface NetworkState {
  currentChainId: number | null;
  isCorrectNetwork: boolean;
  isChecking: boolean;
  error: string | null;
  setCurrentChainId: (chainId: number | null) => void;
  setIsChecking: (isChecking: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  currentChainId: null,
  isCorrectNetwork: true,
  isChecking: false,
  error: null,
  setCurrentChainId: (chainId) =>
    set({
      currentChainId: chainId,
      isCorrectNetwork: chainId === MOCK_TARGET_NETWORK.chainId,
      error: null,
    }),
  setIsChecking: (isChecking) => set({ isChecking }),
  setError: (error) => set({ error }),
}));
