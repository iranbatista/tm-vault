import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VaultData } from "@/components/vault-card";
import { colors } from "@/constants/colors";
import { useVaults } from "@/services/vaults";
import { useWallet, walletService } from "@/services/wallet";
import { formatCurrencyFull } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Portfolio() {
  const router = useRouter();
  const wallet = useWallet();
  const vaults = useVaults();

  const userVaults = vaults.filter((vault) => vault.userBalance > 0);
  const totalBalance = vaults.reduce((sum, vault) => sum + vault.userBalance, 0);

  const handleViewVault = (data: VaultData) => {
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

  if (!wallet.connected) {
    return (
      <View className="flex-1 bg-neutral-950">
        <Header title="Portfolio" hideCta />
        <View className="flex-1 px-4 items-center mt-20">
          <View className="bg-neutral-900 rounded-full p-6 mb-6">
            <Ionicons name="wallet-outline" size={48} color={colors.neutral[400]} />
          </View>
          <Text className="text-white text-2xl font-sans-bold text-center mb-2">
            Connect Your Wallet
          </Text>
          <Text className="text-neutral-500 text-center text-lg mb-8 px-8">
            Connect your wallet to view your portfolio and track your investments
          </Text>
          <Button
            label="Connect Wallet"
            rightIcon="chevron-forward"
            onPress={() => walletService.connect()}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-950">
      <Header title="Portfolio" />

      <View className="flex-1 px-4 mt-2">
        <Card>
          <Text className="text-neutral-500 font-sans-medium">Total Balance</Text>
          <Text className="text-white text-4xl font-sans-bold mt-2">
            {formatCurrencyFull(totalBalance)}
          </Text>
        </Card>

        <Text className="text-neutral-500 text-lg mt-5">Your vaults</Text>
        <FlatList
          data={userVaults}
          keyExtractor={(item) => item.id}
          className="mt-2"
          contentContainerClassName="gap-4 pb-safe-offset-5"
          renderItem={({ item }) => {
            const percentage =
              totalBalance > 0 ? ((item.userBalance / totalBalance) * 100).toFixed(0) : 0;
            return (
              <TouchableOpacity activeOpacity={0.5} onPress={() => handleViewVault(item)}>
                <Card>
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-white text-lg font-sans-medium">{item.name}</Text>
                      <Text className="text-neutral-500">{percentage}% of total</Text>
                    </View>
                    <Text className="text-white text-xl font-sans-bold">
                      {formatCurrencyFull(item.userBalance)}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
