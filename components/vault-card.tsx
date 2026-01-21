import { useWallet } from "@/services/wallet";
import { formatCurrency } from "@/utils/format";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { RiskTag, VaultRisk } from "./risk-tag";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export interface VaultData {
  id: string;
  name: string;
  risk: VaultRisk;
  apyRange: {
    min: number;
    max: number;
  };
  tvl: number;
  userBalance: number;
  description: string;
}

interface VaultCardProps {
  data: VaultData;
}

export function VaultCard({ data }: VaultCardProps) {
  const router = useRouter();
  const wallet = useWallet();

  const handleViewVault = () => {
    router.push({
      pathname: "/vault-details",
      params: {
        id: data.id,
        name: data.name,
        risk: data.risk,
        apyMin: data.apyRange.min,
        apyMax: data.apyRange.max,
        tvl: data.tvl,
        userBalance: data.userBalance,
        description: data.description,
      },
    });
  };

  return (
    <Card>
      <View className="flex-row justify-between items-start">
        <Text className="text-white text-xl font-sans-medium">{data.name}</Text>
        <RiskTag risk={data.risk} />
      </View>

      <View className="flex-row gap-2 mt-5 mb-5">
        <View className="flex-1">
          <Text className="text-neutral-500">APY</Text>
          <Text className="text-white font-sans-medium text-lg">
            {data.apyRange.min}% - {data.apyRange.max}%
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-neutral-500">TVL</Text>
          <Text className="text-white font-sans-medium text-lg">{formatCurrency(data.tvl)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-neutral-500">Your Balance</Text>
          <Text className="text-white font-sans-medium text-lg">
            {!wallet.connected
              ? "Connect wallet"
              : data.userBalance === 0
                ? "No funds"
                : formatCurrency(data.userBalance)}
          </Text>
        </View>
      </View>
      <Button
        variant="secondary"
        label="View vault"
        rightIcon="arrow-forward"
        onPress={handleViewVault}
      />
    </Card>
  );
}
