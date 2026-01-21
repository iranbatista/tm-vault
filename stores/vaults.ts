import { create } from "zustand";
import { VaultData } from "@/components/vault-card";
import { MOCK_VAULTS } from "@/mocks/vaults";

interface VaultsState {
  vaults: VaultData[];
  selectedVaultId: string | null;
  setSelectedVault: (vaultId: string | null) => void;
  updateVaultBalance: (vaultId: string, amount: number) => void;
  getVaultById: (vaultId: string) => VaultData | undefined;
}

export const useVaultsStore = create<VaultsState>((set, get) => ({
  vaults: MOCK_VAULTS,
  selectedVaultId: null,
  setSelectedVault: (vaultId) => set({ selectedVaultId: vaultId }),
  updateVaultBalance: (vaultId, amount) =>
    set((state) => ({
      vaults: state.vaults.map((vault) =>
        vault.id === vaultId
          ? { ...vault, userBalance: vault.userBalance + amount }
          : vault
      ),
    })),
  getVaultById: (vaultId) => get().vaults.find((v) => v.id === vaultId),
}));
