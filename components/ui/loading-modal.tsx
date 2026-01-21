import LottieView from "lottie-react-native";
import { Modal, Text, View } from "react-native";

interface LoadingModalProps {
  visible: boolean;
  message?: string;
}

export function LoadingModal({
  visible,
  message = "Loading...",
}: LoadingModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/70">
        <View className="bg-neutral-800 rounded-2xl px-10 pt-4 pb-8 items-center">
          <LottieView
            autoPlay
            loop
            style={{
              width: 80,
              height: 80,
            }}
            source={require("../../assets/animations/loader.json")}
          />
          <Text className="text-white font-sans-medium text-lg mt-2">
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
