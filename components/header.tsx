import { colors } from "@/constants/colors";
import { useWallet, walletService } from "@/services/wallet";
import { formatCurrencyFull } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  hideCta?: boolean;
}

export function Header({
  title,
  canGoBack = false,
  hideCta = false,
}: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const wallet = useWallet();

  function handleConnectWallet() {
    walletService.connect();
  }

  function handleDisconnectWallet() {
    walletService.disconnect();
  }

  return (
    <LinearGradient
      colors={["rgba(38, 38, 38, 0.95)", "rgba(23, 23, 23, 0.85)", "transparent"]}
      locations={[0, 0.7, 1]}
      style={{
        paddingTop: insets.top + 40,
        paddingHorizontal: 16,
        paddingBottom: 20,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {canGoBack && (
            <TouchableOpacity
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)"))}
            >
              <Ionicons name="chevron-back" size={30} color={colors.white} />
            </TouchableOpacity>
          )}
          <Image source={require("@/assets/images/logo.png")} style={{ width: 102, height: 40 }} />
        </View>
        {wallet.connected ? (
          <View className="flex-row items-center gap-4">
            <View className="items-end">
              <Text className="text-white font-sans-semibold">
                {formatCurrencyFull(wallet.usdcBalance)}
              </Text>
              <Text className="text-neutral-500 font-sans-medium text-sm">
                {wallet.truncatedAddress}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-neutral-800 h-12 w-12 items-center justify-center rounded-xl"
              onPress={handleDisconnectWallet}
            >
              <Ionicons name="log-out-outline" size={24} color={colors.neutral[500]} />
            </TouchableOpacity>
          </View>
        ) : (
          !hideCta && (
            <Button
              label="Connect Wallet"
              rightIcon="chevron-forward"
              onPress={handleConnectWallet}
            />
          )
        )}
      </View>
      <Text className="text-white font-sans-medium text-3xl mt-6 text-center">{title}</Text>
    </LinearGradient>
  );
}
