import { toastConfig } from "@/components/ui/toast-config";
import { WrongNetworkModal } from "@/components/wrong-network-modal";
import { colors } from "@/constants/colors";
import { networkService } from "@/services/network";
import { useWallet } from "@/services/wallet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const wallet = useWallet();
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (wallet.connected) {
      networkService.detectNetwork();
    }
  }, [wallet.connected, wallet.chainId]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.neutral[950] },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vault-details" />
        <Stack.Screen name="deposit" />
      </Stack>
      <StatusBar translucent style="light" />
      <Toast config={toastConfig} topOffset={insets.top + 20} />
      <WrongNetworkModal />
    </>
  );
}
