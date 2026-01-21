import { SuccessModal } from "@/components/success-modal";
import { Button } from "@/components/ui/button";
import { LoadingModal } from "@/components/ui/loading-modal";
import { colors } from "@/constants/colors";
import { depositService, DepositState } from "@/services/deposit";
import { useSelectedVault } from "@/services/vaults";
import { useWallet } from "@/services/wallet";
import { formatCurrencyFull } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Deposit() {
  const [amount, setAmount] = useState<number | null>(null);
  const [buttonLabel, setButtonLabel] = useState("Approve");
  const [loaderMessage, setLoaderMessage] = useState("Waiting for approval...");
  const [depositState, setDepositState] = useState<DepositState>("idle");
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const wallet = useWallet();
  const selectedVault = useSelectedVault();


  const totalAvailable = wallet.usdcBalance;
  const isInsufficientFunds = (amount ?? 0) > totalAvailable;
  const estimatedShares =
    selectedVault && amount ? depositService.calculateEstimatedShares(amount, selectedVault.id) : 0;

  async function handleApprove() {
    const result = await depositService.approve(amount!);
    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Transaction Approved!",
        text2: "Now you can deposit it",
      });
      setDepositState("approved");
      setButtonLabel("Deposit");
      setLoaderMessage("Depositing funds...");
    } else {
      Toast.show({
        type: "error",
        text1: "Approval Failed",
        text2: result.error?.message,
      });
      setDepositState("idle");
    }
  }

  async function handleDeposit() {
    if (!selectedVault) return;

    const result = await depositService.deposit(amount!, selectedVault.id);
    if (result.success) {
      setDepositState("success");
    } else {
      Toast.show({
        type: "error",
        text1: "Deposit Failed",
        text2: result.error?.message,
      });
      setDepositState("approved");
    }
  }

  function handleSubmit() {
    const validation = depositService.validateDeposit(amount, selectedVault?.id ?? null);
    if (!validation.success) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: validation.error?.message,
      });
      return;
    }

    if (depositState === "idle") {
      setDepositState("approving");
      handleApprove();
      return;
    }

    if (depositState === "approved") {
      setDepositState("depositing");
      handleDeposit();
    }
  }

  function handleCloseSuccessModal() {
    setDepositState("idle");
    setAmount(null);
    setButtonLabel("Approve");
    router.replace("/(tabs)/portfolio");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-neutral-950">
        <LoadingModal
          message={loaderMessage}
          visible={["approving", "depositing"].includes(depositState)}
        />
        <SuccessModal
          visible={depositState === "success"}
          title="Deposit Successful!"
          message="Your fund have been deposited to the vault."
          buttonLabel="Go to Portfolio"
          onClose={handleCloseSuccessModal}
        />
        <LinearGradient
          colors={["rgba(38, 38, 38, 0.95)", "rgba(23, 23, 23, 0.85)", "transparent"]}
          locations={[0, 0.7, 1]}
          style={{
            paddingTop: insets.top + 40,
            paddingHorizontal: 16,
            paddingBottom: 5,
          }}
        >
          <View className="flex-row items-center justify-center">
            <TouchableOpacity
              className="absolute left-0"
              onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)"))}
            >
              <Ionicons name="chevron-back" size={30} color={colors.white} />
            </TouchableOpacity>
            <Text className="text-white font-sans-medium text-3xl">
              {selectedVault ? `Deposit to ${selectedVault.name}` : "Deposit"}
            </Text>
          </View>
        </LinearGradient>

        <View className="flex-1 px-4">
          <View className="items-center mt-10">
            <Text className="text-neutral-500 mb-2">Amount (USDC)</Text>
            <CurrencyInput
              value={amount}
              onChangeValue={setAmount}
              prefix="$"
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              placeholder="$0.00"
              keyboardType="decimal-pad"
              style={{
                color: colors.white,
                fontSize: 48,
                fontFamily: "Inter-Bold",
                textAlign: "center",
                height: 96,
              }}
              placeholderTextColor={colors.neutral[500]}
            />
            <Text className={isInsufficientFunds ? "text-red-500" : "text-neutral-500"}>
              {isInsufficientFunds ? "Insufficient funds - " : "Available: "}
              {formatCurrencyFull(totalAvailable)}
            </Text>
            <Text className="text-neutral-500">Estimated Shares: {estimatedShares.toFixed(2)}</Text>
          </View>

          <View className="flex-row gap-4 justify-center mt-5">
            <Button
              variant="secondary"
              label="25%"
              onPress={() => setAmount(totalAvailable * 0.25)}
            />
            <Button
              variant="secondary"
              label="50%"
              onPress={() => setAmount(totalAvailable * 0.5)}
            />
            <Button
              variant="secondary"
              label="75%"
              onPress={() => setAmount(totalAvailable * 0.75)}
            />
            <Button variant="secondary" label="MAX" onPress={() => setAmount(totalAvailable)} />
          </View>

          <View className="mt-auto pb-safe-offset-5">
            <Button
              label={buttonLabel}
              onPress={handleSubmit}
              disabled={!amount || amount <= 0 || isInsufficientFunds}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
