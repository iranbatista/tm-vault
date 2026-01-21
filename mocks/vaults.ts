import { VaultData } from "@/components/vault-card";

export const MOCK_VAULTS: VaultData[] = [
  {
    id: "stable-vault",
    name: "Stable Vault",
    risk: "low",
    apyRange: {
      min: 6,
      max: 8,
    },
    tvl: 12450000,
    userBalance: 1200,
    description:
      "Low-risk strategies focused on stable returns using diversified assets.",
  },
  {
    id: "growth-vault",
    name: "Growth Vault",
    risk: "medium",
    apyRange: {
      min: 10,
      max: 14,
    },
    tvl: 8420000,
    userBalance: 0,
    description:
      "Balanced strategies aiming for higher yield with moderate volatility.",
  },
  {
    id: "turbo-vault",
    name: "Turbo Vault",
    risk: "high",
    apyRange: {
      min: 18,
      max: 25,
    },
    tvl: 3670000,
    userBalance: 450,
    description:
      "High-risk, high-reward strategies optimized for aggressive yield seekers.",
  },
];