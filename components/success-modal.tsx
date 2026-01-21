import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "./ui/button";

interface SuccessModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  buttonLabel?: string;
  onClose?: () => void;
}

export function SuccessModal({
  visible,
  title = "Success!",
  message = "Your operation was completed successfully.",
  buttonLabel = "Done",
  onClose,
}: SuccessModalProps) {
  const confettiRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      confettiRef.current?.play();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/70 px-6">
        <LottieView
          ref={confettiRef}
          source={require("../assets/animations/confetti.json")}
          loop={false}
          style={StyleSheet.absoluteFill}
        />
        <View className="bg-neutral-800 rounded-2xl px-6 py-8 items-center w-full">
          <View className="bg-green-500/20 rounded-full p-4 mb-4">
            <Ionicons
              name="checkmark-circle"
              size={48}
              color={colors.green[500]}
            />
          </View>
          <Text className="text-white font-sans-bold text-2xl mb-2">
            {title}
          </Text>
          <Text className="text-neutral-400 text-center mb-6">{message}</Text>
          <View className="w-full gap-3">
            <Button label={buttonLabel} variant="secondary" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
