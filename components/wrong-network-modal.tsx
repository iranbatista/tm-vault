import { Button } from "@/components/ui/button";
import { colors } from "@/constants/colors";
import { networkService, useNetwork } from "@/services/network";
import { useWallet } from "@/services/wallet";
import { TARGET_NETWORK } from "@/stores/network";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, View } from "react-native";

export function WrongNetworkModal() {
  const wallet = useWallet();
  const { isCorrectNetwork, isChecking, error } = useNetwork();

  const visible = wallet.connected && !isCorrectNetwork;

  const handleSwitchNetwork = async () => {
    await networkService.switchToTargetNetwork();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/80 px-6">
        <View className="bg-neutral-900 rounded-2xl p-6 w-full max-w-sm border border-neutral-800">
          <View className="items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-red-500/20 items-center justify-center mb-4">
              <Ionicons name="warning" size={32} color={colors.red[500]} />
            </View>
            <Text className="text-white font-sans-semibold text-xl text-center">Wrong Network</Text>
          </View>

          <Text className="text-neutral-400 font-sans text-center mb-2">
            Please switch to{" "}
            <Text className="text-primary font-sans-medium">{TARGET_NETWORK.name}</Text> to use this
            app.
          </Text>

          <Text className="text-neutral-500 font-sans text-sm text-center mb-6">
            Currently connected to:{" "}
            <Text className="text-neutral-300">{wallet.networkName || "Unknown"}</Text>
          </Text>

          {error && (
            <View className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <Text className="text-red-400 font-sans text-sm text-center">{error}</Text>
            </View>
          )}

          <Button
            label={isChecking ? "Switching..." : `Switch to ${TARGET_NETWORK.name}`}
            leftIcon="swap-horizontal"
            onPress={handleSwitchNetwork}
            disabled={isChecking}
          />

          <Text className="text-neutral-600 font-sans text-xs text-center mt-4">
            Chain ID: {TARGET_NETWORK.chainId}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
