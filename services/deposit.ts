import { useWalletStore } from "@/stores/wallet";
import { vaultsService } from "./vaults";

export type DepositState =
  | "idle"
  | "approving"
  | "approved"
  | "depositing"
  | "success"
  | "error";

export interface DepositError {
  code: "INSUFFICIENT_FUNDS" | "INVALID_AMOUNT" | "NO_VAULT_SELECTED" | "NOT_CONNECTED" | "UNKNOWN";
  message: string;
}

export interface DepositResult {
  success: boolean;
  error?: DepositError;
}

const APPROVAL_DELAY = 1500;
const DEPOSIT_DELAY = 2000;

class DepositService {
  private getWalletStore() {
    return useWalletStore.getState();
  }

  validateDeposit(amount: number | null, vaultId: string | null): DepositResult {
    const wallet = this.getWalletStore().wallet;

    if (!wallet.connected) {
      return {
        success: false,
        error: {
          code: "NOT_CONNECTED",
          message: "Please connect your wallet first",
        },
      };
    }

    if (!vaultId) {
      return {
        success: false,
        error: {
          code: "NO_VAULT_SELECTED",
          message: "Please select a vault to deposit into",
        },
      };
    }

    if (!amount || amount <= 0) {
      return {
        success: false,
        error: {
          code: "INVALID_AMOUNT",
          message: "Please enter a valid amount",
        },
      };
    }

    if (amount > wallet.usdcBalance) {
      return {
        success: false,
        error: {
          code: "INSUFFICIENT_FUNDS",
          message: `Insufficient funds. You have ${wallet.usdcBalance.toFixed(2)} USDC available`,
        },
      };
    }

    return { success: true };
  }

  async approve(amount: number): Promise<DepositResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.05;
        if (isSuccess) {
          resolve({ success: true });
        } else {
          resolve({
            success: false,
            error: {
              code: "UNKNOWN",
              message: "Approval transaction failed. Please try again.",
            },
          });
        }
      }, APPROVAL_DELAY);
    });
  }

  async deposit(amount: number, vaultId: string): Promise<DepositResult> {
    const validation = this.validateDeposit(amount, vaultId);
    if (!validation.success) {
      return validation;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.05;
        if (isSuccess) {
          vaultsService.updateVaultBalance(vaultId, amount);

          const currentBalance = this.getWalletStore().wallet.usdcBalance;
          this.getWalletStore().setUsdcBalance(currentBalance - amount);

          resolve({ success: true });
        } else {
          resolve({
            success: false,
            error: {
              code: "UNKNOWN",
              message: "Deposit transaction failed. Please try again.",
            },
          });
        }
      }, DEPOSIT_DELAY);
    });
  }

  calculateEstimatedShares(amount: number, vaultId: string): number {
    const vault = vaultsService.getVaultById(vaultId);
    if (!vault) return 0;

    const sharePrice = 1 + (vault.apyRange.min / 100) * 0.1;
    return amount / sharePrice;
  }
}

export const depositService = new DepositService();
