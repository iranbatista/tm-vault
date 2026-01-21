import { Header } from "@/components/header";
import { RiskTag, VaultRisk } from "@/components/risk-tag";
import { Button } from "@/components/ui/button";
import { vaultsService } from "@/services/vaults";
import { useWallet } from "@/services/wallet";
import { formatCurrency, formatCurrencyFull } from "@/utils/format";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function VaultDetails() {
  const router = useRouter();
  const wallet = useWallet();
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    risk: VaultRisk;
    apyMin: string;
    apyMax: string;
    tvl: string;
    userBalance: string;
    description: string;
  }>();

  return (
    <View className="flex-1 bg-neutral-950">
      <Header title={params.name} canGoBack />
      <View className="flex-1 px-4 mt-2">
        <View className="items-center">
          <RiskTag risk={params.risk} />
        </View>

        <Text className="text-white mb-4 leading-relaxed mt-5 text-lg">{params.description}</Text>

        <View className="flex-row gap-4 mb-5">
          <View className="flex-1">
            <Text className="text-neutral-500">APY</Text>
            <Text className="text-white font-sans-medium text-lg">
              {params.apyMin}% - {params.apyMax}%
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-neutral-500">TVL</Text>
            <Text className="text-white font-sans-medium text-lg">
              {formatCurrency(Number(params.tvl))}
            </Text>
          </View>
        </View>

        <Text className="text-neutral-500">Your Balance</Text>
        <Text className="text-white font-sans-bold text-3xl">
          {!wallet.connected
            ? "Connect wallet"
            : Number(params.userBalance) === 0
              ? "No funds yet"
              : formatCurrencyFull(Number(params.userBalance))}
        </Text>

        <View className="mt-auto pb-safe-offset-5">
          <Button
            label="Deposit"
            onPress={() => {
              vaultsService.selectVault(params.id);
              router.push("/deposit");
            }}
            disabled={!wallet.connected}
          />
        </View>
      </View>
    </View>
  );
}
