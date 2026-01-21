import { VaultData } from "@/components/vault-card";
import { useVaultsStore } from "@/stores/vaults";

class VaultsService {
  private getStore() {
    return useVaultsStore.getState();
  }

  getVaultById(vaultId: string): VaultData | undefined {
    return this.getStore().getVaultById(vaultId);
  }

  selectVault(vaultId: string): void {
    this.getStore().setSelectedVault(vaultId);
  }

  updateVaultBalance(vaultId: string, amount: number): void {
    this.getStore().updateVaultBalance(vaultId, amount);
  }
}

export const vaultsService = new VaultsService();

export const useVaults = () => useVaultsStore((state) => state.vaults);
export const useSelectedVault = () =>
  useVaultsStore((state) =>
    state.selectedVaultId
      ? state.vaults.find((v) => v.id === state.selectedVaultId)
      : undefined
  );
